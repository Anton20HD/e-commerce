"use client";

import React, { useState } from "react";
import styles from "@/app/wishlist/page.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { useWishlist } from "@/app/components/wishlistContext/page";
import { useCart } from "../components/cartContext/page";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const WishListPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [open, setOpen] = useState<string | null>(null);

  // Record provides a clean way to define an object type with key-value pairs,especially a dynamic structure like sizes.
  const [selectedSizes, setSelectedSizes] =  useState<Record<string, string>>({});

  const handleSizeSelect = (itemId: string, size: string) => {
    setSelectedSizes((prev)=> ({ ...prev, [itemId]:size}));
    setOpen(null);

  }

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
                        setOpen(open === item._id ? null : item._id);
                      }}
                    >
                    <span className={styles.chooseSize}>{selectedSizes[item._id] || "Choose size"}</span>{open === item._id ? (
                          <ExpandMoreIcon />
                        ) : (
                          <ExpandLessIcon />
                        )}
                    </div>

                    {open === item._id && (
                    <div
                      className={styles.dropdownMenu}>
                      <ul>
                      {["S", "M", "L"].map((size) => (
                              <DropdownItem
                                key={size}
                                size={size}
                                onClick={() => handleSizeSelect(item._id, size)}
                              />
                            ))}
                      </ul>
                    </div>
                    )}
                    </div>
                    <button
                      className={styles.addToCartButton}
                      onClick={() =>
                        addToCart({
                          _id: item._id,
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          size: selectedSizes[item._id],
                          quantity: 1,
                        })
                      }
                      disabled={!selectedSizes[item._id]}
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

interface DropdownItemProps {
  size: string;
  onClick: () => void;
}


function DropdownItem({ size, onClick }: DropdownItemProps) {
  return (
    <li onClick={onClick}>
      <a className={styles.sizeInfo}>{size}</a>
    </li>
  );
}

export default WishListPage;
