
"use client"

import React, {useEffect, useState} from "react";
import styles from "@/app/login/page.module.scss";
import homeIcon from "@/app/assets/GymBeast.svg";
import Link from "next/link";
import { useRouter} from "next/navigation";

const LoginPage = () => {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {

    //Redirect to dashboard if already logged in
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


  try {
    const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
    })

    const data = await response.json();

    if(response.ok) {
      //store token in localstorage
      localStorage.setItem("token", data.token);
      setError(null);
    console.log("Login successful!")

    //Redirect user to homepage after login
    router.push("/dashboard")
    } else {

      setError(data.message || "Invalid credentials. Please try again");
    }
  } catch(err) {
    console.error("Error during login:", err);
    setError("An error occured. Please try again")
  }
  
}
  
  
  
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.iconWrapper}>
          <img className={styles.icon} src={homeIcon.src} alt="Home" />
        </div>
        <h1 className={styles.loginTitle}>Gymbeast Login</h1>
        <form  onSubmit={handleSubmit}className={styles.orderInfo}>
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
            <input
              className={styles.loginLabel}
              type="text"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
            {error && <p className={styles.errorText}>{error}</p>}
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
