import React from "react";
import styles from "@/app/components/header/page.module.scss";
import homeIcon from "@/app/assets/GymBeast.svg";
import SearchBar from "../searchBar/page";
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import CartIcon from "@mui/icons-material/LocalMallOutlined";
import ButtonContent from "../buttons/page";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.headerContent}>
      <div className={styles.iconContent}>
        <Link href="/" passHref>
          <img className={styles.icon} src={homeIcon.src} alt="Home" />
        </Link>
      </div>
      <ButtonContent />
      <div className={styles.searchBarContent}>
        <SearchBar />
      </div>
      <div className={styles.iconsContent}>
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
