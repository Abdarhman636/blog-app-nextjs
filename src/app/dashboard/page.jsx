 "use client"

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


const Dashboard = () => {
  const session = useSession()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')

  // const [data, setData] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // useEffect(() => {
  //   const getData = async () => {
  //     setLoading(true)
  //     const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      
  //     if(!res.ok) {
  //       setError(true)
  //     }
  //     const apiData = await res.json()
  //     console.log(apiData)
      
  // setData(apiData)
  // setLoading(false)
  //   }
  //   getData()
  // }, [])


  // handel the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          desc,
          image,
          content,
          username: session.data.user.name,
        }),
      }),
      mutate()
      e.target.reset()
    } catch (err) {
      console.error(err)
    }
  }

  // delete posts
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      }),
      mutate()
    } catch (err) {
      console.error(err) 
    }
  }

  // fetch data from api
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data,mutate, error, isLoading } = useSWR(`/api/posts?username=${session.data?.user?.name}`, fetcher)

  if (session.status === "loading") {
    return <div>Loading...</div>
  }

  if (session.status === "unauthenticated") {
    router?.push('/dashboard/login') 
  }

  if(session.status === 'authenticated') {
    return (
      <div className={styles.container}>
      <div className={styles.posts}>
        {isLoading
          ? "loading"
          : data?.map((post) => (
              <div className={styles.post} key={post._id}>
                <div className={styles.imgContainer}>
                  <Image src={post.image} alt="" width={200} height={100} />
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <span
                  className={styles.delete}
                  onClick={() => handleDelete(post._id)}
                >
                  X
                </span>
              </div>
            ))}
      </div>
      <form className={styles.new} onSubmit={handleSubmit}>
        <h1>Add New Post</h1>
    <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} className={styles.input} />
        <input type="text" placeholder="Desc" onChange={(e) => setDesc(e.target.value)} className={styles.input} />
        <input type="text" placeholder="Image" onChange={(e) => setImage(e.target.value)} className={styles.input} />
        <textarea
          placeholder="Content"
          className={styles.textArea}
          cols="30"
          onChange={(e) => setContent(e.target.value)}
          rows="10"
        ></textarea>
        <button className={styles.button}>Send</button>
      </form>
    </div>
        )
  }
}

export default Dashboard