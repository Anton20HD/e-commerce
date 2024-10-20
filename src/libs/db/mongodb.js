import mongoose from "mongoose";


//Dont forget to change to env variable later
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://antonhaglund20:zFSZKv9LEEpqV2BZ@ecommerce.xlt8q.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Ecommerce"
    );
    console.log("Successfully connected to DB!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;

connectDB();
