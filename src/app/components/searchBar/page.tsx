
"use client"

import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import styles from "./page.module.scss"
import {useRouter} from 'next/navigation';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';



const SearchBar = () => {
  const [searchQuery,setSearchQuery] = useState<string>('');
  const router = useRouter();
  

 

    return (
        <form>
          <TextField
            sx={{ display: 'flex', alignItems: 'flex-end' }}
            className={styles.searchBar}
            id="outlined-basic"
            variant="filled"
            label="What are you looking for?.." 
            type="search"
            slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}  
          />
        </form>
    );
    };
    
    export default SearchBar;