"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/dashboard/page.module.scss";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReceiptIcon from "@mui/icons-material/Receipt";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, status} = useSession();
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
    if (!session && status !== "loading") {
      router.push("/login");
    }
  }, [session, status, router]);

  const handleSignOut = () => {

    signOut({ callbackUrl: "/"})
  }

  
  if (!session) {
    return null; // Avoid rendering anything until redirect is handled
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardTitleContent}>
        <h1 className={styles.dashboardTitle}>Hello {session.user.name}!</h1>
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
              <span className={styles.itemName}>Orders</span>
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
              <span className={styles.itemName}>Wishlist</span>
            </div>
          </div>
          <div className={styles.signOutSection}>
            <div
              className={`${styles["itemWrapper"]} ${
                activeLink === "signout" ? styles["active"] : ""
              }`}
              onClick={() => {
                setActiveLink("signout")
                handleSignOut();
              
              }}

            >
              <ExitToAppIcon />
              <span className={styles.itemName}>Signout</span>
            </div>
          </div>
        </div>
        <div className={styles.accountContent}>
        {activeLink === 'orders' && 
        <div>
          <h2>My orders</h2>

          
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
