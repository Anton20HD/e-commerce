"use client";

import React, { useState } from "react";
import styles from "@/app/wishlist/page.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { useWishlist } from "@/app/components/wishlistContext/page";
import { useCart } from "../components/cartContext/page";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const WishListPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);

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
                  <div className={styles.productInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>{item.price} kr</p>
                  </div>
                  <div className={styles.sizeAndAddProductSection}>
                    <div className={styles.sizeDetails}>
                    <div
                      className={styles.chooseSizeSection}
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                    <span className={styles.chooseSize}>Choose size</span><ArrowUpwardIcon/>
                    </div>

                    <div
                      className={`${styles.dropdownMenu} ${open ? styles.active : styles.inactive}`}
                    >
                      <ul>
                        <DropdownItem size="S" />
                        <DropdownItem size="M" />
                        <DropdownItem size="L" />
                      </ul>
                    </div>
                    </div>
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

function DropdownItem({ size }: { size: string }) {
  return (
    <li>
      <a>{size}</a>
    </li>
  );
}

export default WishListPage;
