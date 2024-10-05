import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to DB!");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
