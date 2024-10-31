"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/products/page.module.scss";
import CartIcon from "@mui/icons-material/LocalMallOutlined";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";

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
  const router = useRouter();

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

  const handleProduct = (productId: string) => {
    router.push(`/products/${productId}`)
  };

  return (
    <div className={styles.productSection}>
      {products.map((product) => (
        <div key={product._id} onClick={() => handleProduct(product._id)}>
          <div className={styles.productCard}>
            <div className={styles.buttonContent}>
              <button className={styles.wishList}>
                <HeartIcon className={styles.heartIcon} />
              </button>
            </div>
            {product.image.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={product.name}
                className={styles.productImage}
              />
            ))}
          </div>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.productPrice}>{product.price} kr</p>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
