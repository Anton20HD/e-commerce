import React from "react";
import styles from "./page.module.scss";
import homeIcon from "@/app/assets/beast.svg"

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
      <section className={styles.footerContainer}>
        <div className={styles.homeIcon}>
        <img className={styles.icon} src={homeIcon.src} alt="" />

        </div>

        <div className={styles.shopSection}>
           <h2>Shop</h2>
           <p>Mens</p>
           <p>Womens</p>
           <p>Accessories</p>
        </div>
        <div className={styles.accountSection}>
          <h2>My account</h2>
          <p>Login</p>
          <p>Register</p>
        </div>
        <div className={styles.socialIconsSection}>
          <div className={styles.newsLetterSection}>
            <h2>Newsletter</h2>
            <p>Subscribe to our newsletter!</p>
            <NewsLetterBar/>

          </div>
          <ul className={styles.ul}>
            <li>
              <a href="#" className={styles.instagramColor}>
                <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
              </a>
            </li>
            <li>
              <a href="#" className={styles.youtubeColor}>
                <FontAwesomeIcon icon={faYoutube} className={styles.icon} />
              </a>
            </li>
            <li>
              <a href="#" className={styles.facebookColor}>
                <FontAwesomeIcon icon={faFacebookF} className={styles.icon} />
              </a>
            </li>
            <li>
              <a href="#" className={styles.tiktokColor}>
                <FontAwesomeIcon icon={faTiktok} className={styles.icon} />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
