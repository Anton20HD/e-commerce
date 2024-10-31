"use client"


import React, { useState } from "react";
import styles from "@/app/components/header/page.module.scss";
import homeIcon from "@/app/assets/GymBeast.svg";
import SearchBar from "../searchBar/page";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HeartIconFilled from '@mui/icons-material/Favorite';
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIconFilled from '@mui/icons-material/Person';
import CartIcon from "@mui/icons-material/LocalMallOutlined";
import CartIconFilled from '@mui/icons-material/LocalMall';
import ButtonContent from "../buttons/page";
import Link from "next/link";
import Cart from "../cart/page";

const Header = () => {

  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCart = () => {
    setIsCartVisible(prevState => !prevState);
  };


  return (
    <div className={styles.headerContent}>
      <div className={styles.iconContent}>
        <Link href="/" passHref>
          <img className={styles.icon} src={homeIcon.src} alt="Home" />
        </Link>
      </div>
      <ButtonContent />
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
        <div className={styles.iconButton} onClick={toggleCart}>
            <CartIcon/>
        </div>
      </div>
      {isCartVisible && <Cart toggleMenu={toggleCart} isVisible={isCartVisible} />}
      {isCartVisible && <div className={styles.overlay} onClick={toggleCart} />}
    </div>
  );
};

export default Header;
