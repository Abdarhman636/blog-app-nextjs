import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'


const Blog = () => {
  return (
    <div classNam={styles.mainContainer}>
      <Link className={styles.containers} href='/testId'>
      <div className={styles.imageContainer}>
        <Image />
      </div>
      <div  className={styles.content}>
        <h1 className={styles.title}>Test</h1>
        <p className={styles.desc}>Desc</p>
      </div>
      </Link>
    </div>
  )
}

export default Blog