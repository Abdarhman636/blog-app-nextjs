import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'


async function getData() {
  const res = await fetch('http://localhost:3000/api/posts')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const Blog =async () => {
  const data = await getData()
  console.log(data);

  return (
    <div classNam={styles.mainContainer}>
      {data.map((post) => (
      <Link key={post.id} className={styles.containers} href={`/blog/${post._id}`}>
              <div className={styles.imageContainer}>
                <Image width={400} height={250} style={styles.image} src={post.image} alt='test' />
              </div>
              <div  className={styles.content}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.desc}>{post.desc}</p>
              </div>
              </Link>
      ))}
    </div>
  )
}

export default Blog