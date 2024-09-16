"use client";

import React, { useState } from "react";
import styles from "@/app/components/navBar/page.module.scss";
import homeIcon from "@/app/assets/beast.svg";
import SearchBar from "../searchBar/page";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import CartIcon from "@mui/icons-material/LocalMallOutlined";
import ButtonContent from "../buttons/page";

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
      
      <ButtonContent/>
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
