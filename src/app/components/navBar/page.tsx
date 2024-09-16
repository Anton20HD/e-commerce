"use client";

import React, { useState } from "react";
import styles from "@/app/components/navBar/page.module.scss";
import homeIcon from "@/app/assets/beast.svg";
import SearchBar from "../searchBar/page";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import CartIcon from "@mui/icons-material/LocalMallOutlined";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className={styles.headerContent}>
      <div className={styles.iconContent}>
        <img className={styles.icon} src={homeIcon.src} alt="" />
      </div>

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
                  <a className={styles.link} href="#">All</a>
                  <a className={styles.link} href="#">T-shirts & Tops</a>
                  <a className={styles.link} href="#">Hoodies</a>
                  <a className={styles.link} href="#">Shorts</a>
                  <a className={styles.link} href="#">Sweaters</a>

                </div>
              </div>
          </div>
        </div>

        <button className={styles.headerButtons}>WOMEN'S</button>

        <button className={styles.headerButtons}>ACCESSORIES</button>
      </div>
      <div className={styles.searchBarContent}>
        <SearchBar />
      </div>
      <div className={styles.iconsContent}>
        <div className={styles.iconButton}>
          <HeartIcon />
        </div>
        <div className={styles.iconButton}>
          <PersonIcon />
        </div>
        <div className={styles.iconButton}>
          <CartIcon />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
