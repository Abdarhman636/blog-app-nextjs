'use client'

import React, {useState} from 'react'
import styles from './page.module.css'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const session = useSession()
  const router = useRouter()

  const [error, setError] = useState(null)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  if (session.status === "loading") {
    return <div>Loading...</div>
  } 

  if (session.status === "authenticated") {
    router?.push('/dashboard')
  }

  // handel the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    signIn("credentials", {
      email, password
    })
  };

  return (
<div className={styles.container}>
<form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Email"
        required
        className={styles.input}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"  
        required
        className={styles.input}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.button}>Login</button>
    </form>
  <button onClick={() => signIn('google')}>Login with google</button>
</div>
  )
}

export default Login