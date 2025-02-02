"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import styles from "@/app/success/page.module.scss";
import shoppingBagCheck from "@/app/assets/shoppingBagCheck.svg";

const Success = () => {
    const [orderDetails, setOrderDetails] = useState<any>({ items: [], totalAmount: 0 });
  const router = useRouter();

  useEffect(() => {
    const fetchSessionAndStoreOrder = async () => {
      const sessionId = new URLSearchParams(window.location.search).get(
        "session_id"
      );

      if (!sessionId) {
        return router.push("/checkout");
      }

      const response = await fetch(
        `/api/stripe-session?session_id=${sessionId}`
      );
      const session = await response.json();

      const cart = JSON.parse(session.metadata.cart || "[]");

      console.log("cart", cart);

      // store guest order in ls if no user is logged in
      if (!session.customer_email) {
        localStorage.setItem("guestOrder", JSON.stringify(cart));
      }

      const order = session.customer_email
      ? cart
      : JSON.parse(localStorage.getItem("guestOrder") || "[]");

      console.log("Order for user:", order);

      setOrderDetails({
        items: order,
        totalAmount: session.amount_total / 100,
      });
    };

    fetchSessionAndStoreOrder();
  }, [router]);

  console.log("orderDetails", orderDetails);

  return (
    <div className={styles.successPageContainer}>
      <div className={styles.cartImageSection}>
        <img src={shoppingBagCheck.src} alt="" />
      </div>
      <div className={styles.successMessageSection}>
        <h1>Thank you for your order Anton!</h1>
        <p>Your order has been successfully placed.</p>
      </div>
      <div className={styles.orderDetailsSection}>
        <h2>Your order details:</h2>
        {orderDetails.items.length > 0 ? (
            <ul>
                {orderDetails.items.map((item:any) => (
                   <li key={`${item._id}-${item.quantity}`}>
                  <p><strong>{item.name}</strong></p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price {item.price}</p>
                  </li>
                ))}
            </ul>
        ) : (
            <p>It seems there was an issue with retrieving your order details. Please contact support</p>
        )}
        <div>
            <h3> Total Amount: {orderDetails.totalAmount} kr</h3>
        </div>
      </div>
    </div>
  );
};

export default Success;
