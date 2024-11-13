"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../searchContext/page";
import styles from "@/app/components/searchDropdown/page.module.scss";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchBar from "../searchBar/page";


interface SearchDropdownProps {
  toggleDropdown: () => void;
  isVisible: boolean;
}

const ProductSearchDropdown = ({toggleDropdown, isVisible}: SearchDropdownProps) => {
  const { searchTerm, setSearchTerm, filteredProducts } = useSearch();
  const router = useRouter();

  const handleProduct = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className={`${styles.searchDropdownContainer} ${isVisible ? styles.open : ""}`}>
      <div className={styles.searchBar}>
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="What are you looking for?.."
          inputProps={{ "aria-label": "search clothes" }}
        />
      </div>

      {/* <div className={styles.productSection}>
      {filteredProducts.map((product) => (
        <div key={product._id} onClick={() => handleProduct(product._id)}>
          <div className={styles.productCard}>
            <div className={styles.buttonContent}>
              <button className={styles.wishList}>
                <HeartIcon className={styles.heartIcon} />
              </button>
            </div>
            {product.image.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={product.name}
                className={styles.productImage}
              />
            ))}
          </div>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.productPrice}>{product.price} kr</p>
        </div>
      ))}
    </div> */}
    </div>
  );
};

export default ProductSearchDropdown;
