import React from "react";
import styles from "@/app/components/navBar/page.module.scss";
import homeIcon from "@/app/assets/beast.svg";

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
    </div>
  );
};

export default NavBar;
