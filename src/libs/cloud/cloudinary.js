import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET);

const connectCloudinary = async () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are not set correctly");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  

  try {
    const result = await cloudinary.api.ping();
    console.log("Succesfully connected to Cloudinary:", result);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error connecting to Cloudinary:", error.message);
    } else {
        console.error('Unexpected error connecting to Cloudinary:', error)
    }
  }
};


connectCloudinary();

//export default connectCloudinary;
