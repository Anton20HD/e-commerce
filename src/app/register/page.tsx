import React from "react";
import styles from "@/app/register/page.module.scss";
import homeIcon from "@/app/assets/GymBeast.svg";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerContent}>
        <div className={styles.iconWrapper}>
          <img className={styles.icon} src={homeIcon.src} alt="Home" />
        </div>
        <h1 className={styles.registerTitle}>Gymbeast Signup</h1>
        <form method="post" action={""} className={styles.orderInfo}>
          <div className={styles.inputInfo}>
            <div className={styles.shippingSection}>
              <h2 className={styles.shippingTitle}></h2>
            </div>

            <input
              className={styles.registerLabel}
              type="text"
              placeholder="Email"
              name="email"
            />
            <input
              className={styles.registerLabel}
              type="text"
              placeholder="Password"
              name="password"
            />
            <button type="submit" className={styles.registerButton}>
              Register
            </button>
            <div className={styles.loginSection}>
            <h3 className={styles.loginText}>Already have an account? <Link href={"/login"}><span className={styles.loginSpanText}>Login here!</span></Link></h3>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
