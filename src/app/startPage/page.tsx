"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/startPage/page.module.scss";
import blackTShirt from "@/app/assets/black-t-shirt.png";
import whiteTShirt from "@/app/assets/white-t-shirt.png";
import Products from "@/app/components/products/page";
import { products } from "@/app/api/data";
import CategoryPage from "@/app/categoryPage/page";

const StartPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/data.ts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  return (
    <div className={styles.startPageContainer}>
      <div className={styles.videoSection}>
        <video
          className={styles.video}
          src="/videos/running.mp4"
          autoPlay
          loop
          muted
        />
      </div>

      <Products />
      <CategoryPage />
    </div>
  );
};

export default StartPage;