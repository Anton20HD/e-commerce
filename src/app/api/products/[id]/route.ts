  import { NextResponse } from "next/server";
  import productModel from "@/models/productModel";
  import connectDB from "@/libs/db/mongodb";

  export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    await connectDB();

    try {
      const product = await productModel.findById(params.id);
      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      console.error("Error fetching product:", error);
      return NextResponse.json(
        { message: "Error fetching product" },
        { status: 500 }
      );
    }
  }
