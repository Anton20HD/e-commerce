"use client";

import React, { useState } from "react";
import styles from "@/app/components/buttons/page.module.scss";

const ButtonContent = () => {

    const [activeLink, setActiveLink] = useState<string | null>(null);

    const handleMouseEnter = (link: string) => {
      setActiveLink(link);
    };

    const handleMouseLeave = () => {
      setActiveLink(null)
    }
  

  return (
    <div className={styles.buttonContent}>
        <div
         className={styles.dropdown}>
          <button
            className={`${styles.headerButtons} ${
              activeLink === "mens" ? styles.active : ""
            }`}
          >
            MEN'S
          </button>
          <div className={styles.dropdownContent}>
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
            onMouseEnter={() => handleMouseEnter("womens")}
            onMouseLeave={handleMouseLeave}
          >
            WOMEN'S
          </button>
          <div className={styles.dropdownContent}>
            <div>
              <h3 className={styles.dropdownHeading}>Clothes</h3>
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
                  Leggings
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
            onMouseEnter={() => handleMouseEnter("accessories")}
            onMouseLeave={handleMouseLeave}
          >
            ACCESSORIES
          </button>
          <div className={styles.dropdownContent}>
            <div>
              <h3 className="dropdownHeading">Clothes</h3>
              <div className={styles.dropdownLinks}>
                <a className={styles.link} href="#">
                  All
                </a>
                <a className={styles.link} href="#">
                  Equipment
                </a>
                <a className={styles.link} href="#">
                  Socks
                </a>
                <a className={styles.link} href="#">
                  Caps
                </a>
                <a className={styles.link} href="#">
                  Bottles
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ButtonContent