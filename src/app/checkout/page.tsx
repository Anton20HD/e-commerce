"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@/app/checkout/page.module.scss";
import RelatedProducts from "@/app/components/relatedProducts/page";
import { useCart } from "@/app/components/cartContext/page";

const Checkout = () => {
  const { cart, calculateTotalPrice } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutTitleSection}>
        <h1 className={styles.checkoutTitle}>Checkout</h1>
      </div>
      <div className={styles.productContent}>
        <div className={styles.cartSection}>
          <h2 className={styles.cartTitle}>Your Cart</h2>
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
                {calculateTotalPrice(item._id, item.size ?? "", item.price)} kr
              </p>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <form method="post" action="/api/checkout" className={styles.orderInfo}>
          <div className={styles.inputInfo}>
            <div className={styles.shippingSection}>
              <h2 className={styles.shippingTitle}>Shipping address</h2>
            </div>

            <input
              className={styles.checkoutLabel}
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.checkoutLabel}
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.checkoutLabel}
              type="text"
              placeholder="City"
              value={city}
              name="city"
              onChange={(e) => setCity(e.target.value)}
            />
            <div className={styles.addressLabel}>
              <input
                className={styles.checkoutLabel}
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                name="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <input
                className={styles.checkoutLabel}
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </div>
            <input
              className={styles.checkoutLabel}
              type="text"
              placeholder="Country"
              value={country}
              name="country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className={styles.totalPriceSection}>
            <p className={styles.totalLabel}>Total</p>
            <p className={styles.totalPrice}>
              {cart.reduce(
                (total, item) =>
                  total + calculateTotalPrice(item._id, item.size ?? "", item.price),
                0
              )}{" "}
              kr
            </p>
          </div>
          <input type="hidden"></input>
          <button type="submit" className={styles.paymentButton}>Pay now</button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
