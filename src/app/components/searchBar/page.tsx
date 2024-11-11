"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../searchContext/page";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch}: SearchBarProps) => {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    onSearch(search);
  }, [search, setSearch]);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 260,
        backgroundColor: "#f4f4f4",
        boxShadow: "none",
        borderRadius: "5px"
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        value={search} onChange={(e) => setSearch(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="What are you looking for?.."
        inputProps={{ "aria-label": "search clothes" }}
      />
     
    </Paper>
  );
};

export default SearchBar;
