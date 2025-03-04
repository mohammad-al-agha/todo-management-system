"use-client";

import Link from "next/link";
import styles from "./styles/auth.module.css";
import "./styles/globals.css";

const login = () => {
  return (
    <div className={styles.auth_page}>
      <header className={styles.auth_header}>
        <h1 className={styles.auth_title}>Sign in to Your Account</h1>
      </header>
      <main className={styles.auth_content}>
        <form className={styles.auth_box}>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="button_blue">Sign in</button>
        </form>
      </main>
      <footer className={styles.auth_footer}>
        <p className={styles.auth_footer_text}>
          Don't have an account? <Link href={"/register"}>Sign up</Link>
        </p>
      </footer>
    </div>
  );
};
export default login;
