import React from "react";
import styles from "./page.module.scss";
import homeIcon from "@/app/assets/GymBeast.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faYoutube,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import NewsLetterBar from "../newsLetterbar/page";

const Footer = () => {
  return (
    <footer className={styles.footer}>
       <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <section className={styles.footerContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.homeIcon}>
            <img className={styles.icon} src={homeIcon.src} alt="" />
          </div>

          <div className={styles.shopSection}>
            <h2 className={styles.title}>Shop</h2>
            <p>Mens</p>
            <p>Womens</p>
            <p>Accessories</p>
          </div>
          <div className={styles.accountSection}>
            <h2 className={styles.title}>My account</h2>
            <p>Login</p>
            <p>Register</p>
          </div>
        </div>
       

        <div className={styles.socialIconsSection}>
          <div className={styles.newsLetterSection}>
            <h2 className={styles.title}>Newsletter</h2>
            <p>Subscribe to our newsletter!</p>
            <NewsLetterBar />
          </div>
          <div className={styles.ul}>
        <a
          className={styles.socialButton}
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram}  size="lg" />
        </a>

        <a
          className={styles.socialButton}
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>

        <a
          className={styles.socialButton}
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTiktok} />
        </a>

        <a
          className={styles.socialButton}
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebookF} className={styles.icon} size="xs" />
        </a>
      </div>
        </div>
      </section>
      <div className={styles.copyrightSection}>
        <p> © 2024 GymBeast. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
