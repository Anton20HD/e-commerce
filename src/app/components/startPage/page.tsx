 "use client"


import React, { useEffect } from "react";
import styles from "@/app/components/startPage/page.module.scss";
import blackTShirt from "@/app/assets/black-t-shirt.png";
import whiteTShirt from "@/app/assets/white-t-shirt.png";

async function getProduct() {
  const res = await fetch("http://localhost:3000/api/route");
  const data = await res.json();
  data.products.forEach(
    (item: { id: string | number }) => (item.id = "products_" + item.id)
  );

  return data;
}

const StartPage = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct();
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className={styles.startPageContainer}>
      <div className={styles.videoSection}>
        <video
          className={styles.video}
          src="/videos/running.mp4"
          autoPlay
          loop
          muted
        />
      </div>
      <h2>Latest Drops</h2>
      <div className={styles.productSection}></div>
    </div>
  );
};

export default StartPage;
