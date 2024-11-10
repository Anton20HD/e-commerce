"use client";

import React, { useState } from "react";
import styles from "@/app/components/header/page.module.scss";
import homeIcon from "@/app/assets/GymBeast.svg";
import SearchBar from "../searchBar/page";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HeartIconFilled from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIconFilled from "@mui/icons-material/Person";
import CartIcon from "@mui/icons-material/LocalMallOutlined";
import CartIconFilled from "@mui/icons-material/LocalMall";
import ButtonContent from "../buttons/page";
import Link from "next/link";
import Cart from "../cart/page";
import { useCart } from "../cartContext/page";

const Header = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { cart } = useCart();

  const toggleCart = () => {
    setIsCartVisible((prevState) => !prevState);
  };

  return (
    <>
      {isCartVisible && (
        <div className={styles.overlay} onClick={toggleCart}></div>
      )}

      <div className={styles.headerContent}>
        <div className={styles.iconContent}>
          <Link href="/" passHref>
          <div className={styles.iconWrapper}>
            <img className={styles.icon} src={homeIcon.src} alt="Home" />
          </div>
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
          <div className={styles.cartButton} onClick={toggleCart}>
            <CartIcon />
            {cart.length > 0 && (
              <div className={styles.cartCounter}>{cart.length}</div>
            )}
          </div>
        </div>
        <Cart toggleMenu={toggleCart} isVisible={isCartVisible} />
      </div>
    </>
  );
};

export default Header;
