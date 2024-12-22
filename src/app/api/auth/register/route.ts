import { NextResponse } from 'next/server';
import {User} from "@/models/userModel"
import connectDB from '@/libs/db/mongodb';
import bcrypt from 'bcrypt';



export async function POST(req: Request) {
  

  try {
    await connectDB();
    const { name, email, password } = await req.json();
    
    if(await User.findOne({email})) {
      return NextResponse.json(
        { message: 'User already exists'},
        { status: 400 }
      );
    }

      // Hash password before saving to db
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ name, email, password: hashedPassword}); 
    await user.save();

    return NextResponse.json(
      { message: 'User registered successfully'},
      { status: 201 }
    );
  } catch(error) {
    return NextResponse.json(
      { message: 'Internal Server'},
      { status: 500 }
    );
  }
}
