"use client";

import Link from "next/link";
import styles from "./styles/auth.module.css";
import "./styles/globals.css";
import { localAction } from "./utils/localAction";
import { request } from "./utils/request";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AppInput from "./components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./utils/login.zod.schema";

const login = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const handleLogin = async (formData: any) => {
    try {
      const response = await request({
        method: "POST",
        route: "/auth/login",
        body: formData,
      });
      console.log(response);

      await localAction("name", response.name);
      await localAction("token", response.token);

      router.push("/todos");
    } catch (error: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.auth_page}>
      <header className="header_title">
        <h1 className={styles.auth_title}>Sign in to Your Account</h1>
      </header>
      <main className={styles.auth_content}>
        <form className={styles.auth_box} onSubmit={handleSubmit(handleLogin)}>
          <AppInput
            {...register("email")}
            inputType="text"
            text="Email"
            error={errors.email?.message}
          />
          <AppInput
            {...register("password")}
            inputType="password"
            text="Password"
            error={errors.password?.message}
          />
          {error && <p className={styles.auth_error_text}>{error}</p>}
          <button className="button_blue" type="submit">
            Login
          </button>
        </form>
      </main>
      <footer className={styles.auth_footer}>
        <p className={styles.auth_footer_text}>
          Don't have an account? <Link href={"/register"}>Sign Up</Link>
        </p>
      </footer>
    </div>
  );
};
export default login;
