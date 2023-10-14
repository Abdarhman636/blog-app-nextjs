"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState(null)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  // handel the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 && router.push("/dashboard/login?success=Account has been created");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  // the return
  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Create an Account</h1>
    <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
<form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Username"
        required
        className={styles.input}
    onChange={(e) => setName(e.target.value)}
      />
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
      <button className={styles.button}>Register</button>
    </form>
    <span className={styles.or}>- OR -</span>
    {error && <p className={styles.error}>{error.message}</p>}
    <Link className={styles.link} href="/dashboard/login">
      Login with an existing account
    </Link>
  </div>
  )
}

export default Register