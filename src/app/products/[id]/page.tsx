"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@/app/products/[id]/page.module.scss";

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
  const { id } = useParams(); // Access to the specific id for the product
  const [product, setProduct] = useState<Product | null>(null); // Single product initialization. Is either null or an object
  const [selectedSize, setSelectedSize] = useState('');

 const handleSizeChange = (size: string) => {
    setSelectedSize(size);
 }

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${id}`);
          if (!response.ok) {
            throw new Error("Product not found");
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
    <div className={styles.productSection}>
      <div className={styles.ImageSection}>
        {product.image.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt={product.name}
            className={styles.productImage}
          />
        ))}
      </div>
      <div className={styles.descriptionSection}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p>Size: {selectedSize}</p>
        <div>
            {product.sizes.map((size,index ) =>
            <label key={index}>
                <input
                type="radio"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={() => handleSizeChange(size)}
                />
                {size}
            </label>
            )}
        </div>

        <p className={styles.productPrice}>{product.price} €</p>
        <h3>Description</h3>
        <p>{product.description}</p>
        <button>Add to cart</button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ProductPage;
