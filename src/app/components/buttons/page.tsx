"use client";

import React, { useState } from "react";
import styles from "@/app/components/buttons/page.module.scss";

const ButtonContent = () => {

    const [activeLink, setActiveLink] = useState<string | null>(null);

    const handleLinkClick = (link: string) => {
      setActiveLink(link);
    };
  

  return (
    <div className={styles.buttonContent}>
        <div className={styles.dropdown}>
          <button
            className={`${styles.headerButtons} ${
              activeLink === "mens" ? styles.active : ""
            }`}
            onMouseEnter={() => handleLinkClick("mens")}
          >
            MEN'S
          </button>
          <div className={styles.dropdownMenu}>
            <div>
              <h3 className="dropdownHeading">Clothes</h3>
              <div className={styles.dropdownLinks}>
                <a className={styles.link} href="#">
                  All
                </a>
                <a className={styles.link} href="#">
                  T-shirts & Tops
                </a>
                <a className={styles.link} href="#">
                  Hoodies
                </a>
                <a className={styles.link} href="#">
                  Shorts
                </a>
                <a className={styles.link} href="#">
                  Sweaters
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dropdown}>
          <button
            className={`${styles.headerButtons} ${
              activeLink === "womens" ? styles.active : ""
            }`}
            onMouseEnter={() => handleLinkClick("womens")}
          >
            WOMEN'S
          </button>
          <div className={styles.dropdownMenu}>
            <div>
              <h3 className="dropdownHeading">Clothes</h3>
              <div className={styles.dropdownLinks}>
                <a className={styles.link} href="#">
                  All
                </a>
                <a className={styles.link} href="#">
                  T-shirts & Tops
                </a>
                <a className={styles.link} href="#">
                  Hoodies
                </a>
                <a className={styles.link} href="#">
                  Shorts
                </a>
                <a className={styles.link} href="#">
                  Sweaters
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dropdown}>
          <button
            className={`${styles.headerButtons} ${
              activeLink === "accessories" ? styles.active : ""
            }`}
            onMouseEnter={() => handleLinkClick("accessories")}
          >
            ACCESSORIES
          </button>
          <div className={styles.dropdownMenu}>
            <div>
              <h3 className="dropdownHeading">Clothes</h3>
              <div className={styles.dropdownLinks}>
                <a className={styles.link} href="#">
                  All
                </a>
                <a className={styles.link} href="#">
                  T-shirts & Tops
                </a>
                <a className={styles.link} href="#">
                  Hoodies
                </a>
                <a className={styles.link} href="#">
                  Shorts
                </a>
                <a className={styles.link} href="#">
                  Sweaters
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ButtonContent