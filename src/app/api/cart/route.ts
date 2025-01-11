import { NextResponse } from "next/server";
import { User } from "@/models/userModel"

export async function POST(req: Request) {
    const { userId, productId, quantity, price, name} = await req.json()

    try {
        const user = await User.findById(userId);
        if(!user) {
            return NextResponse.json({ message: "User not found"}, { status: 404})
        }

        const newCartItem = { productId, quantity, price, name}

        user.cartData.push(newCartItem)
        await user.save()

        return NextResponse.json({ message: "Item added to cart", cart: user.cartData})
    } catch(error) {
        console.error(error)
        return NextResponse.json({ message: "Error adding item to cart"}, { status: 500 })
    }

}