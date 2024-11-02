"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/components/cart/page.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import CartIcon from "@mui/icons-material/LocalMallOutlined";
import { useCart } from "../cartContext/page";
import Link from "next/link";

interface CartProps {
  toggleMenu: () => void;
  isVisible: boolean;
}

const Cart = ({ toggleMenu, isVisible }: CartProps) => {
  const { cart } = useCart();

  return (
    <div className={`${styles.cartContainer} ${isVisible ? styles.open : ""}`}>
      <div className={styles.titleSection}>
        <div className={styles.cartInfo}>
          <h2 className={styles.cartTitle}> Your cart</h2>
        </div>
        <div className={styles.navCloseIcon} onClick={toggleMenu}>
          <CloseIcon className={styles.closeIcon}></CloseIcon>
        </div>
      </div>
      <div className={styles.productContent}>
        {cart.length === 0 ? (
          <div className={styles.emptyCartSection}>
            <h4 className={styles.emptyCartTitle}>Your Cart is empty</h4>
            <div className={styles.buttonSection}>
              <Link href="/products">
                <button className={styles.navigateButton} onClick={toggleMenu}>
                  Shop Products
                </button>
              </Link>
              <Link href="/allAccessoriesPage">
                <button className={styles.navigateButton} onClick={toggleMenu}>
                  Shop Accessories
                </button>
              </Link>
            </div>
          </div>
        ) : (
          cart.map((item) => (
            <div key={`$item._id}-${item.size}`} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.cartItemImage}
              />
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p>Size: {item.size}</p>
                <p className={styles.itemPrice}>{item.price} kr</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))
        )}
        {cart.length > 0 && (
        <div className={styles.orderInfo}>
          <p className={styles.totalPrice}>Total</p>
          <button className={styles.paymentButton}>Continue to payment</button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
