"use client";

import React, { useState } from "react";
import styles from "@/app/components/buttons/page.module.scss";

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
      <button
        className={`${styles.headerButtons} ${
          activeLink === "products" ? styles.active : ""
        }`}
        onMouseEnter={() => handleMouseEnter("products")}
        onMouseLeave={handleMouseLeave}
      >
        Products
      </button>
      <button
        className={`${styles.headerButtons} ${
          activeLink === "accessories" ? styles.active : ""
        }`}
        onMouseEnter={() => handleMouseEnter("accessories")}
        onMouseLeave={handleMouseLeave}
      >
        ACCESSORIES
      </button>
      </div>
    </div>
  );
};

export default ButtonContent;
