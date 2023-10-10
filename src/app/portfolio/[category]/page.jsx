import React from 'react'
import styles from './page.module.css'
import Button from '@/components/Button/button'
import Image from 'next/image'

const Category = ({params}) => {
  console.log(params)
  return (
<div className={styles.containers}>
  <h1 className={styles.catTitle}>{params.category}</h1>
  <div className={styles.item}>
    <div className={styles.content}>
      <h1 className={styles.title}>Test</h1>
      <p className={styles.desc}>Desc</p>
      <Button text='See More' url='#'/>
    </div>
    <div className={styles.imgContainer}>
      {/* <Image className={styles.img} fill={true} src={} /> */}
    </div>
  </div>
</div>
  )
}

export default Category