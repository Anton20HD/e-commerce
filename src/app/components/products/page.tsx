import React from "react";
import styles from "@/app/components/products/page.module.scss";
import picture from "@/app/assets/white-t-shirt.png";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { products } from "@/app/api/data";
import ArrowLeftIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowRightIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const Products = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.productSection}>
        <ArrowLeftIcon className={styles.arrowLeft}/>
        {products.map((product,index) => (
          <div className={styles.card} key={index}>
            <div className={styles.cardWrapper}>
              <button className={styles.wishList}>
                <HeartIcon className={styles.heartIcon} />
              </button>
              <img
                className={styles.cardImage}
                src={product.image.default.src}
                height={290}
                width={230}
                alt=""
              />
            </div>
            <div className={styles.cardDetails}>
              <h3 className={styles.cardTitle}>{product.title}</h3>
              <p className={styles.cardPrice}>{product.price} kr</p>
            </div>
          </div>
        ))}
        <ArrowRightIcon  className={styles.arrowRight}/>
      </div>
    </div>
  );
};

export default Products;
