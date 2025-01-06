"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/dashboard/page.module.scss";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

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
            <h4>Orders</h4>


          </div>
          <div className={styles.wishlistSection}>
            <h4>Wishlist</h4>


          </div>
          <div className={styles.signOutSection}>
              <h4>Sign out</h4>



          </div>
        </div>
        <div className={styles.accountContent}>
       
          

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
