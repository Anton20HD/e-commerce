import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/models/userModel";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route"

interface SessionUser {
    id: string;  
  }
  
  interface Session {
    user: SessionUser;
    expires: string;
  }

export async function POST(req: Request) {
    const session = await getServerSession(authOptions) as Session;
    console.log("Session:", session);


    if(!session || !session.user?.id ) {

        return NextResponse.json({ message: "Unauthorized"}, { status: 401})
    }

    const userId = session.user.id;
    const { totalAmount } = await req.json();

    try {
        const user = await User.findById(userId)
        console.log("Fetched User:", user);

        if(!user || user.cartData.length === 0 ) {
            console.log("Cart Data:", user?.cartData);
            return NextResponse.json({message: 'Cart is empty or user not found'}, { status: 404 });
        }

        const newOrder = {
            orderId: new mongoose.Types.ObjectId().toString(),
            items: user.cartData,
            totalAmount,
            date: new Date(),
        }

        user.orders = user.orders || [];
        user.orders.push(newOrder);


        // Clear the cart to avoid duplication
        user.cartData = [];

        await user.save();

        return NextResponse.json({ message: 'Order placed successfully', order: newOrder});
    } catch(error) {
        console.error(error);
        NextResponse.json({ message: 'Error placing order'}, { status: 500})
    }
}

export async function GET(req: Request) {
    const session = (await getServerSession(authOptions)) as Session;

    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    
      const userId = session.user.id;

    try {
        const user = await User.findById(userId);

        if (!user || user.orders.length === 0) {
            return NextResponse.json({ message: 'No orders found.' }, { status: 404 });
          }

          return NextResponse.json({ orders: user.orders });
    } catch(error) {

        console.error(error); 
        return NextResponse.json({ message: 'Error fetching orders'}, { status: 500 })
    }

}

