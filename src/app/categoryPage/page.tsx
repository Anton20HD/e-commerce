import React from "react";
import styles from "@/app/categoryPage/page.module.scss";
import clothesImg from "@/app/assets/clothes.jpg";
import accessoriesImg from "@/app/assets/accessories.jpeg";
import Link from "next/link";

const CategoryPage = () => {
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.categorySection}>
        <div className={styles.imageWrapper}>
          <img className={styles.clothesImg} src={clothesImg.src} alt="" />
          <Link href="/products">
            <button className={styles.categoryButton}>Clothes</button>
          </Link>
        </div>

        <div className={styles.imageWrapper}>
          <img
            className={styles.accessoriesImg}
            src={accessoriesImg.src}
            alt=""
          />
          <Link href="/allAccessoriesPage">
            <button className={styles.categoryButton}>Accessories</button>
          </Link>
        </div>
      </div>
      <div className={styles.buttonSection}></div>
    </div>
  );
};

export default CategoryPage;
