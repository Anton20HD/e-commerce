import React from "react";
import styles from "@/app/components/products/page.module.scss";
import picture from "@/app/assets/white-t-shirt.png";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Products = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.productSection}>
        <div className={styles.card}>
          <button className={styles.wishList}>
            <HeartIcon className={styles.heartIcon} />
          </button>
          <img
            className={styles.cardImage}
            src={picture.src}
            height={290}
            width={230}
            alt=""
          />
          <div className={styles.cardDetails}>
            <h3 className={styles.cardTitle}>White T-Shirt</h3>
            <p className={styles.cardPrice}>300 kr</p>
          </div>
        </div> <div className={styles.card}>
          <button className={styles.wishList}>
            <HeartIcon className={styles.heartIcon} />
          </button>
          <img
            className={styles.cardImage}
            src={picture.src}
            height={290}
            width={230}
            alt=""
          />
          <div className={styles.cardDetails}>
            <h3 className={styles.cardTitle}>White T-Shirt</h3>
            <p className={styles.cardPrice}>300 kr</p>
          </div>
        </div> <div className={styles.card}>
          <button className={styles.wishList}>
            <HeartIcon className={styles.heartIcon} />
          </button>
          <img
            className={styles.cardImage}
            src={picture.src}
            height={290}
            width={230}
            alt=""
          />
          <div className={styles.cardDetails}>
            <h3 className={styles.cardTitle}>White T-Shirt</h3>
            <p className={styles.cardPrice}>300 kr</p>
          </div>
        </div> <div className={styles.card}>
          <button className={styles.wishList}>
            <HeartIcon className={styles.heartIcon} />
          </button>
          <img
            className={styles.cardImage}
            src={picture.src}
            height={290}
            width={230}
            alt=""
          />
          <div className={styles.cardDetails}>
            <h3 className={styles.cardTitle}>White T-Shirt</h3>
            <p className={styles.cardPrice}>300 kr</p>
          </div>
        </div> <div className={styles.card}>
          <button className={styles.wishList}>
            <HeartIcon className={styles.heartIcon} />
          </button>
          <img
            className={styles.cardImage}
            src={picture.src}
            height={290}
            width={230}
            alt=""
          />
          <div className={styles.cardDetails}>
            <h3 className={styles.cardTitle}>White T-Shirt</h3>
            <p className={styles.cardPrice}>300 kr</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
