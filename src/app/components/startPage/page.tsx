import React from 'react'
import styles from '@/app/components/startPage/page.module.scss'

const StartPage = () => {
  return (
    <div className={styles.startPageContainer}>
      <div className={styles.videoSection}>
       
      <video className={styles.video} src="/videos/running.mp4" autoPlay loop muted />
      </div>
    
    
    </div>
  )
}

export default StartPage;