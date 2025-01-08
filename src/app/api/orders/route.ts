import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/models/userModel";



export async function POST(req: Request) {
    const userId = req.headers.get("userId"); // Get users id(from token)
    const { totalAmount } = await req.json();

    try {
        const user = await User.findById(userId)

        if(!user || user.cartData.length === 0 ) {
            return NextResponse.json({message: 'Cart is empty or user not found'}, { status: 404 });
        }

        const newOrder = {
            orderId: new mongoose.Types.ObjectId().toString(),
            items: user.cartData,
            totalAmount,
            date: new Date(),
        }

        user.orders.push(newOrder);


        // Clear the cart
        user.cartData = [];

        await user.save();

        return NextResponse.json({ message: 'Order placed successfully', order: newOrder});
    } catch(error) {
        console.error(error);
        NextResponse.json({ message: 'Error placing order'}, { status: 500})
    }
}

export async function GET(req: Request) {
    const userId = req.headers.get("userId");

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

