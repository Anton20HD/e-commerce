"use client";

import React, { useState } from "react";
import styles from "@/app/components/buttons/page.module.scss";
import Link from "next/link";

const ButtonContent = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleMouseEnter = (link: string) => {
    setActiveLink(link);
  };

  const handleMouseLeave = () => {
    setActiveLink(null);
  };

  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttonContent}>

      <Link href="/products">
      <button
        className={`${styles.headerButtons} ${
          activeLink === "products" ? styles.active : ""
        }`}
        onMouseEnter={() => handleMouseEnter("products")}
        onMouseLeave={handleMouseLeave}
      >
        Products
      </button>
      </Link>

      <Link href="/accessories">
      <button
        className={`${styles.headerButtons} ${
          activeLink === "accessories" ? styles.active : ""
        }`}
        onMouseEnter={() => handleMouseEnter("accessories")}
        onMouseLeave={handleMouseLeave}
        >
        ACCESSORIES
      </button>
        </Link>
      </div>
    </div>
  );
};

export default ButtonContent;
