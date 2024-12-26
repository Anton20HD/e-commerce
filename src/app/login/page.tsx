"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/login/page.module.scss";
import homeIcon from "@/app/assets/GymBeast.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErrorIcon from '@mui/icons-material/Error';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    //Redirect to dashboard if already logged in
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Clear previous errors
    setEmailError(null);
    setPasswordError(null);
    setError(null);

    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if(!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      setEmailError("Email must be valid");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false
    }

    // If validation fails, stop execution
    if (!isValid) return;
  

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        //store token in localstorage
        localStorage.setItem("token", data.token);

        console.log("Login successful!");

        //Redirect user to homepage after login
        router.push("/dashboard");
      } else {
        if (data.code === "INVALID_EMAIL") {
          setEmailError(data.message);
        } else if (data.code === "INVALID_PASSWORD") {
          setPasswordError(data.message);
        } else {
          setError( data.message || "Invalid credentials. Please try again");
        }
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occured. Please try again");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.iconWrapper}>
          <img className={styles.icon} src={homeIcon.src} alt="Home" />
        </div>
        <h1 className={styles.loginTitle}>Gymbeast Login</h1>
        <form onSubmit={handleSubmit} className={styles.orderInfo}>
          <div className={styles.inputInfo}>
            <div className={styles.shippingSection}>
              <h2 className={styles.shippingTitle}></h2>
            </div>

            <input
              className={styles.loginLabel}
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={styles.errorSection}>
            {emailError && <p className={styles.errorText}><ErrorIcon/>{emailError}</p>}
            </div>
            <input
              className={styles.loginLabel}
              type="text"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className={styles.errorSection}>
            {passwordError && <p className={styles.errorText}><ErrorIcon/>{passwordError}</p>}
            {error && <p className={styles.errorText}><ErrorIcon/>{error}</p>}
              </div>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
            <div className={styles.registrationSection}>
              <h3 className={styles.registrationText}>
                Don't have an account?{" "}
                <Link href={"/register"}>
                  <span className={styles.registrationSpanText}>
                    Sign up here!
                  </span>
                </Link>
              </h3>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
