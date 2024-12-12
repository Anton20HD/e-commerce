import React from 'react'
import styles from '@/app/login/page.module.scss'
import homeIcon from '@/app/assets/GymBeast.svg'


const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
        <div className={styles.loginContent}>
            
            <img className={styles.icon} src={homeIcon.src} alt="" />
            <h1>Gymbeast Login</h1>

        </div>
    </div>
  )
}

export default LoginPage