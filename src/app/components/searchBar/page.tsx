"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../searchContext/page";
import ProductSearchDropdown from "../searchDropdown/page";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };


  return (
    <div className={styles.searchBarContainer}>
      <Paper
        component="form"
        onClick={toggleDropdown}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 260,
          backgroundColor: "#f4f4f4",
          boxShadow: "none",
          borderRadius: "5px",
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="What are you looking for?.."
          inputProps={{ "aria-label": "search clothes" }}
        />
      </Paper>
      <ProductSearchDropdown toggleDropdown={toggleDropdown} isVisible={isDropdownVisible}/>
    </div>
  );
};

export default SearchBar;
