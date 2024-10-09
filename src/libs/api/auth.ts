import userModel from '@/models/userModel'; 
import connectDB from '@/libs/db/mongodb';

export const registerUser = async (name: string, email: string, password: string) => {
  await connectDB();
  const newUser = new userModel({ name, email, password });
  return newUser.save();
};
