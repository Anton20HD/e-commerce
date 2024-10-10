import React from "react";
import styles from "@/app/components/header/page.module.scss";
import homeIcon from "@/app/assets/GymBeast.svg";
import SearchBar from "../searchBar/page";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import CartIcon from "@mui/icons-material/LocalMallOutlined";
import ButtonContent from "../buttons/page";

const Header = () => {
  return (
    <div className={styles.headerContent}>
      <div className={styles.iconContent}>
        <img className={styles.icon} src={homeIcon.src} alt="" />
      </div>
      <ButtonContent />
      <div className={styles.searchBarContent}>
        <SearchBar />
      </div>
      <div className={styles.iconsContent}>
        {/* TODO: Change the divs into a tags */}
        <div className={styles.iconButton}>
          <HeartIcon />
        </div>
        <div className={styles.iconButton}>
          <PersonIcon />
        </div>
        <div className={styles.iconButton}>
          <CartIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
