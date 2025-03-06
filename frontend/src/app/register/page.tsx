"use client";

import Link from "next/link";
import styles from "../styles/auth.module.css";
import { useState } from "react";
import { request } from "../utils/request";
import { localAction } from "../utils/localAction";
import { useRouter } from "next/navigation";
import AppInput from "../components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchame from "../utils/register.zod.schema";

const register = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchame),
  });

  const router = useRouter();

  const handleRegister = async (formData: any) => {
    try {
      const response = await request({
        method: "POST",
        route: "/auth/register",
        body: formData,
      });

      localAction("token", response.token);

      router.push("/todos");
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
      //Note: Redux?
    }
  };

  return (
    <div className={styles.auth_page}>
      <header className="header_title">
        <h1>Create Your Account</h1>
      </header>
      <main className={styles.auth_content}>
        <form
          className={styles.auth_box}
          onSubmit={handleSubmit(handleRegister)}
        >
          <AppInput
            {...register("name")}
            inputType="text"
            text="Name"
            error={errors.name?.message}
          />
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
            Register
          </button>
        </form>
      </main>
      <footer className={styles.auth_footer}>
        <p className={styles.auth_footer_text}>
          Already have an account? <Link href={"/"}>Sign in</Link>
        </p>
      </footer>
    </div>
  );
};
export default register;
