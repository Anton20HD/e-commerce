// import connectDB from "@/libs/db/mongodb";
// import productModel from "@/models/productModel";
// import { uploadImage } from "../cloud/cloudinary.ts";

// export const createProduct = async (
//   name: string,
//   description: string,
//   price: Number,
//   images: string[],
//   category: string,
//   subCategory: string,
//   sizes: string[],
//   soldout: boolean
// ) => {
//   await connectDB();

//   // Upload images to cloudinary
//   const imageUrls = await Promise.all(images.map(image => uploadImage(image)))

//   //Create new product with the uploaded image urls
//   const newProduct = new productModel({
//     name,
//     description,
//     price,
//     image: imageUrls,
//     category,
//     subCategory,
//     sizes,
//     soldout,
//   });
//   return newProduct.save();
// };
