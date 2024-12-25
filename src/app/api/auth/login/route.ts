import { NextResponse } from "next/server";
import { User } from "@/models/userModel";
import connectDB from "@/libs/db/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();
  

    // Handle error if user only submits with no data
    if (!email || !password) {
      return NextResponse.json(
        { message: "email and password are required" },
        { status: 400 }
      );
    }

    //Email validation
    if(!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      return NextResponse.json(
        { message: "Email must be valid" },
        { status: 400 }
      );

    }

    const user = await User.findOne({ email });
    console.log("Fetched user:", user);
    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email" },
        { status: 401 }
      );
    }
    



    //Password validation
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // console.log("Password", password)
    // console.log("Hashed Password", user.password)
    // console.log("Password match result", isPasswordValid)

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    //Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { message: "Login success", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error: ", error);
    return NextResponse.json({ message: "Internal Server" }, { status: 500 });
  }
}
