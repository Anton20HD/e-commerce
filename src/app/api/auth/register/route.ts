import { NextResponse } from 'next/server';
import { registerUser } from '@/libs/services/auth'; // Adjust path as needed

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    const user = await registerUser(name, email, password);
    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user', error }, { status: 500 });
  }
}
