import { NextResponse } from "next/server";
import { User } from "@/models/userModel"
import { CartItem } from "@/app/components/cartContext/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
   

    try {
        const body = await req.json();
        console.log("Request Body:", body)
        const { cartItems } = body;


        const session = await getServerSession(authOptions);
        console.log("Session:", session);  // Log the session

        if(!session) {
            return NextResponse.json(
                { message: "Unauthorized. Please login"},
                { status: 401 }
            )
        }

        const userId = session.user?.id;

        if(!userId) {
            return NextResponse.json(
                {message: "Missing userid in session "},
                { status: 400}
            )

        }if(!cartItems) {
            return NextResponse.json(
                {message: "Missing cartitems"},
                { status: 400}
            )

        }

        const user = await User.findById(userId);
        if(!user) {
            return NextResponse.json({ message: "User not found"}, { status: 404})
        }


        cartItems.forEach((localItem: CartItem) => {
            const existingItem = user.cartData.find(
                (dbItem: CartItem) =>
                    dbItem._id === localItem._id && dbItem.size === localItem.size
            );

            if(existingItem) {
                // update quantity if item already exists
                existingItem.quantity += localItem.quantity;
            } else {
    
                // Add new item to the cart
                user.cartData.push(localItem)
            }
        });

        await user.save()
        return NextResponse.json({ message: "Item added to cart", cart: user.cartData})
    } catch(error) {
        console.error(error)
        return NextResponse.json({ message: "Error adding item to cart"}, { status: 500 })
    }

}

export async function GET(req:Request) {
    try {

        const session = await getServerSession(authOptions);

        if(!session) {
            return NextResponse.json(
                { message: "Unauthorized. Please login"},
                { status: 401 }
            )
        }

        const userEmail = session.user?.email;

        if(!userEmail) {
            return NextResponse.json(
                {message: "Invalid session. User email not found"},
                { status: 400 }
            )
        }

        const user = await User.findOne({ email: userEmail});

        if (!user) {
            return NextResponse.json(
                {message: "User not found"},
                { status: 404}
            );
        }

        return NextResponse.json({ cart: user.cartData})
    } catch (error) {
        console.error("Error fetching cart:", error);
        return NextResponse.json(
            { message: "Error fetching cart"},
            { status: 500}
        )
    }
}