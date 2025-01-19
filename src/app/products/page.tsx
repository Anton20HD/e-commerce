"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/products/page.module.scss";
import CartIcon from "@mui/icons-material/LocalMallOutlined";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
//import { useSearch } from "../components/searchContext/page";
import { useWishlist } from "../components/wishlistContext/page";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  sizes: string[];
  soldout: boolean;
  category: string;
  subCategory: string;
}

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const { searchTerm } = useSearch();
  const router = useRouter();
  const { addToWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("S");

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
    router.push(`/products/${productId}`);
  };

  const handleAddToWishlist = (product: Product) => {
    if (products) {
      addToWishlist({
        _id: product._id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.image[0],
      });
    }
  };

  //const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className={styles.productSection}>
      {products.map((product) => (
        <div key={product._id} onClick={() => handleProduct(product._id)}>
          <div className={styles.productCard}>
            <div className={styles.buttonContent}>
              <button 
              className={styles.wishList} 
              onClick={(e) => {

                e.stopPropagation(); // Prevent navigation to single product page when clicking
                handleAddToWishlist(product);

              }}
              >
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
