import React from "react";
import styles from "@/app/components/categoryPage/page.module.scss";
import menImg from "@/app/assets/men.jpg";
import womenImg from "@/app/assets/women.jpg";
import Link from "next/link";

const CategoryPage = () => {
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.categorySection}>
        <div className={styles.imageWrapper}>
          <img className={styles.womenImg} src={womenImg.src} alt="" />
          <button className={styles.categoryButton}>Women</button>
        </div>

        <div className={styles.imageWrapper}>
          <img className={styles.menImg} src={menImg.src} alt="" />
          <Link href={'/men'}>
            <button className={styles.categoryButton}>Men</button>
          </Link>
        </div>
      </div>
      <div className={styles.buttonSection}></div>
    </div>
  );
};

export default CategoryPage;
