import React from "react";
import styles from "@/app/login/page.module.scss";
import homeIcon from "@/app/assets/GymBeast.svg";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.iconWrapper}>
          <img className={styles.icon} src={homeIcon.src} alt="Home" />
        </div>
        <h1 className={styles.loginTitle}>Gymbeast Login</h1>
        <form method="post" action={""} className={styles.orderInfo}>
          <div className={styles.inputInfo}>
            <div className={styles.shippingSection}>
              <h2 className={styles.shippingTitle}></h2>
            </div>

            <input
              className={styles.loginLabel}
              type="text"
              placeholder="Email"
              name="email"
            />
            <input
              className={styles.loginLabel}
              type="text"
              placeholder="Password"
              name="password"
            />
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
            <div className={styles.registrationSection}>
            <h3 className={styles.registrationText}>Don't have an account? <Link href={"/register"}><span className={styles.registrationSpanText}>Sign up here!</span></Link></h3>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
