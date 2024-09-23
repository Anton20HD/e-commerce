import React, { useState } from "react";
import styles from "@/app/components/products/page.module.scss";
import picture from "@/app/assets/white-t-shirt.png";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { products } from "@/app/api/data";
import ArrowLeftIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const Products = () => {
  const [slide, setSlide] = useState(0);
  const itemsPerSlide = 4; // Number of items shown at once

  const nextSlide = () => {
    if (slide < Math.ceil(products.length / itemsPerSlide) - 1) {
      setSlide(slide + 1);
    }
  };

  const prevSlide = () => {
    if (slide > 0) {
      setSlide(slide - 1);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.arrowSection}>
        <ArrowLeftIcon className={styles.arrowLeft} onClick={prevSlide} />
        <ArrowRightIcon className={styles.arrowRight} onClick={nextSlide} />
      </div>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.productSection}
          style={{ transform: `translateX(-${slide * 71}%)` }}
        >
          {products.map((product, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.cardWrapper}>
                <button className={styles.wishList}>
                  <HeartIcon className={styles.heartIcon} />
                </button>
                <img
                  className={styles.slide}
                  src={product.image.default.src}
                  height={290}
                  width={230}
                  key={index}
                  alt=""
                />
              </div>
              <div className={styles.cardDetails}>
                <h3 className={styles.cardTitle}>{product.title}</h3>
                <p className={styles.cardPrice}>{product.price} kr</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
