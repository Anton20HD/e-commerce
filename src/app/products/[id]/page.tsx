"use client"


import React, {useEffect, useState} from 'react'
import { useParams, useRouter} from "next/navigation";


interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string[];
    sizes: string[];
    soldout: boolean;
  }

const ProductPage = () => {
    const {id} = useParams(); // Access to the specific id for the product
    const [product, setProduct] = useState<Product | null>(null); // Single product initialization. Is either null or an object

    useEffect(() => {
        if (id) {
            const fetchProduct = async() => {
                try {
                    const response = await fetch(`/api/products/${id}`);
                    if (!response.ok) {
                        throw new Error('Product not found');
                    }
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            };
            fetchProduct();
        }
    }, [id]);




  return product ? (
    
    <div>
       {
        product.image.map((imgUrl,index) => (
            <img
                key={index}
                src={imgUrl}
                alt={product.name}
              /> 
        ))
       }

    </div>
   
  ) : (
    <div>Loading...</div>
  )
}

export default ProductPage