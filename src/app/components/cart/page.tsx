
"use client"

import React, { useState } from "react";
import styles from "@/app/components/cart/page.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import CartIcon from "@mui/icons-material/LocalMallOutlined";


interface CartProps {
    toggleMenu: () => void;
    isVisible: boolean;
}

const Cart = ({toggleMenu, isVisible}: CartProps) => {

  return (
    <div className={`${styles.cartContainer} ${isVisible ? styles.open : ''}`}>
      <div
          className={styles.navCloseIcon} onClick={toggleMenu}>
          <CloseIcon className={styles.closeIcon}></CloseIcon>
        </div>
    </div>
  );
};

export default Cart;
