"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/allClothesPage/page.module.scss"

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  soldout: boolean;
}


const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.productSection}>
      {products.map((product) => (
        <div key={product._id} className={styles.productCard}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          </div>   
      ))}
    </div>
  );
};

export default AllProducts;
