import React from "react";
import styles from "@/app/components/navBar/page.module.scss";
import homeIcon from "@/app/assets/beast.svg";
import SearchBar from "../searchBar/page";
import HeartIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import CartIcon from '@mui/icons-material/LocalMallOutlined';

const NavBar = () => {
  return (
    <div className={styles.headerContent}>
      <div className={styles.iconContent}>
        <img className={styles.icon} src={homeIcon.src} alt="" />
      </div>
      <div className={styles.buttonContent}>
        <button className={styles.headerButtons}>Men's</button>

        <button className={styles.headerButtons}>Women's</button>

        <button className={styles.headerButtons}>Accessories</button>
      </div>
      <div className={styles.searchBarContent}>
        <SearchBar />
      </div>
      <div className={styles.iconsContent}>
        <HeartIcon/>
        <PersonIcon/>
        <CartIcon/>
        </div>
    </div>
  );
};

export default NavBar;
