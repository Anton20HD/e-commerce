import React from 'react'
import styles from '@/app/components/categoryPage/page.module.scss'
import menImg from '@/app/assets/men.jpg'
import womenImg from '@/app/assets/women.jpg'

const CategoryPage = () => {
  return (
    <div className={styles.categoryContainer}>
    <div className={styles.categorySection}>
            <img className={styles.womenImg} src={womenImg.src} alt="" />
            <img className={styles.menImg} src={menImg.src} alt="" />
    </div>
    </div>
  )
}

export default CategoryPage;
