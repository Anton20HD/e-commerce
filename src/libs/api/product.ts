import connectDB from "@/libs/db/mongodb";
import productModel from "@/models/productModel";

export const createProduct = async (
  name: string,
  description: string,
  price: Number,
  image: string[],
  category: string,
  subCategory: string,
  sizes: string[],
  soldout: boolean
) => {
  await connectDB();
  const newProduct = new productModel({
    name,
    description,
    price,
    image,
    category,
    subCategory,
    sizes,
    soldout,
  });
  return newProduct.save();
};
