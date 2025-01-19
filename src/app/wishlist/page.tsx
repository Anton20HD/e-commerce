"use client";

import React from "react";
import styles from "@/app/wishlist/page.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { useWishlist } from "@/app/components/wishlistContext/page";
import { useCart } from "../components/cartContext/page";

const WishListPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className={styles.wishlistContainer}>
      <div className={styles.wishlistTitleContent}>
        <h1 className={styles.wishlistTitle}>Wishlist</h1>
      </div>
      <div className={styles.wishlistContent}>
        {wishlist.length === 0 ? (
          <div className={styles.emptyWishlistSection}>
            <h4 className={styles.emptyWishlistTitle}>
              Your Wishlist is empty
            </h4>
          </div>
        ) : (
          wishlist.map((item) => (
            <div
              key={`${item._id}-${item.size}`}
              className={styles.wishlistItem}
            >
              <div className={styles.wishlistWrapper}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.wishlistItemImage}
                />
                <div className={styles.itemDetails}>
                  <div className={styles.c}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>{item.price} kr</p>
                  </div>
                  <div className={styles.f}>
                  <p>Size: {item.size}</p>
                    <button
                      className={styles.addToCartButton}
                      onClick={() =>
                        addToCart({
                          _id: item._id,
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          size: item.size,
                          quantity: 1,
                        })
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.navCloseIcon}>
                <CloseIcon
                  onClick={() => removeFromWishlist(item._id)}
                  className={styles.closeIcon}
                ></CloseIcon>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishListPage;
