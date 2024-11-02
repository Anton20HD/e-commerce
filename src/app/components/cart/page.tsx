"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/components/cart/page.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import CartIcon from "@mui/icons-material/LocalMallOutlined";
import { useCart } from "../cartContext/page";
import Link from "next/link";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import AddIcon from "@mui/icons-material/Add";

interface CartProps {
  toggleMenu: () => void;
  isVisible: boolean;
}

const Cart = ({ toggleMenu, isVisible }: CartProps) => {
  const { cart, addToCart, removeFromCart } = useCart();


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


                <div className={styles.shoppingCartButtons}>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item._id, item.size)}
                >
                  {item.quantity === 1 ? (
                    <DeleteOutlineSharpIcon />
                  ) : (
                    <RemoveSharpIcon />
                  )}
                </button>
                <p>({item.quantity})</p>
                <button
                  className={styles.addButton}
                  onClick={() => addToCart(item)}
                >
                  <AddIcon />
                </button>
              </div>
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
