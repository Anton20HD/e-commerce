import { NextResponse } from 'next/server';
import { createProduct } from '@/libs/api/product'; 
import productModel from '@/models/productModel';
import connectDB from '@/libs/db/mongodb';

export async function POST(req: Request) {
  const { name, description, price, image, category, subCategory, sizes, soldout }  = await req.json();

  try {
    const product = await createProduct(name, description, price, image, category, subCategory, sizes, soldout);
    return NextResponse.json({ message: 'Product created successfully', product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating product', error }, { status: 500 });
  }
}

export async function GET() {
    await connectDB();
    try {
        const products = await productModel.find({});
        return NextResponse.json(products, { status:200 });
    } catch (error) {
        return NextResponse.json({message: 'Error fetching products'}, {status: 500});
    }
}



