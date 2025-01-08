"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/dashboard/page.module.scss";
import { useRouter } from "next/navigation";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReceiptIcon from "@mui/icons-material/Receipt";

const DashboardPage = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState<"orders" | "wishlist" | "signout">("orders");

  // const renderContent = () => {
  //   switch (activeLink) {
  //     case "orders":
  //       return <Orders />;
  //     case "wishlist":
  //       return <Wishlist />;
  //     case "signout":
  //       return <SignOut />;
  //     default:
  //       return <Orders />;
  //   }
  // };

  useEffect(() => {
    //Check user authentication
    const token = localStorage.getItem("token");

    if (!token) {
      //Redirect user to login if not authenticated
      router.push("/login");
    }
  }, [router]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardTitleContent}>
        <h1 className={styles.dashboardTitle}>Hello Username!</h1>
      </div>
      <div className={styles.dashboardSection}>
        <div className={styles.profileOverviewSection}>
          <div className={styles.orderInfoSection}>
            <div
              className={`${styles["itemWrapper"]} ${
                activeLink === "orders" ? styles["active"] : ""
              }`}
              onClick={() => setActiveLink("orders")}
            >
              <ReceiptIcon />
              Orders
            </div>
          </div>
          <div className={styles.wishlistSection}>
            <div
              className={`${styles["itemWrapper"]} ${
                activeLink === "wishlist" ? styles["active"] : ""
              }`}
              onClick={() => setActiveLink("wishlist")}
            >
              <HeartIcon />
              Wishlist
            </div>
          </div>
          <div className={styles.signOutSection}>
            <div
              className={`${styles["itemWrapper"]} ${
                activeLink === "signout" ? styles["active"] : ""
              }`}
              onClick={() => setActiveLink("signout")}
            >
              <ExitToAppIcon />
              Signout
            </div>
          </div>
        </div>
        <div className={styles.accountContent}>
        {activeLink === 'orders' && 
        <div>
          Orders Content
          
          </div>}
        {activeLink === 'wishlist' && 
        <div>
          
          Wishlist Content
          
          </div>}
        {activeLink === 'signout' && 
        <div>
          
          Sign Out Content
          </div>}
        </div>
      </div>
    </div>
  );
};


export default DashboardPage;
