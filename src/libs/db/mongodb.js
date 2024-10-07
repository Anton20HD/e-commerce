import mongoose from "mongoose";



const connectDB = async () => {
  try {

    await mongoose.connect("mongodb+srv://antonhaglund20:zFSZKv9LEEpqV2BZ@ecommerce.xlt8q.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    console.log("Successfully connected to DB!");
  } catch (error) {
    console.log(error);
    process.exit(1);

  }
};

export default connectDB;
