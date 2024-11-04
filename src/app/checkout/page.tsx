"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@/app/checkout/page.module.scss";
import RelatedProducts from "@/app/components/relatedProducts/page";
import { useCart } from "@/app/components/cartContext/page";

const Checkout = () => {
  const { cart, calculateTotalPrice } = useCart();

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutTitleSection}>
        <h1>Checkout</h1>
      </div>
      <div className={styles.productContent}>
        <div className={styles.cartSection}>
          <h3>Your Cart</h3>
        </div>
        {cart.map((item) => (
          <div key={`${item._id}-${item.size}`} className={styles.cartItem}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.cartItemImage}
            />
            <div className={styles.itemDetails}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p>Size: {item.size}</p>
              <p className={styles.itemPrice}>
                {calculateTotalPrice(item._id, item.price)} kr
              </p>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className={styles.orderInfo}>
            <div className={styles.inputInfo}>
            <input type="text" placeholder="Name" name="" id="" />
            <input type="text" placeholder="Email" name="" id="" />
            <input type="text" placeholder="City" name="" id="" />
            <div className={styles.addressLabel}>
            <input type="text" placeholder="Postal Code" name="" id="" />
            <input type="text" placeholder="Street Address" name="" id="" />
            </div>
            <input type="text" placeholder="Country" name="" id="" />
            </div>
          <div className={styles.totalPriceSection}>
            <p className={styles.totalLabel}>Total</p>
            <p className={styles.totalPrice}>
              {cart.reduce(
                (total, item) =>
                  total + calculateTotalPrice(item._id, item.price),
                0
              )}{" "}
              kr
            </p>
          </div>
          <button className={styles.paymentButton}>Pay now</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
