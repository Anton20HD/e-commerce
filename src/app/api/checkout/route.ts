
import connectDB from '@/libs/db/mongodb';

import { NextResponse } from "next/server";


export async function handler(req: Request) {
    await connectDB();

    if(req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 });

}