import React, { FC, Ref } from "react";
import AppIcon from "../icons";
import styles from "./index.module.css";
import usePasswordVisToggle from "@/app/core/hooks/usePasswordVisToggle";

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  inputType: React.HTMLInputTypeAttribute;
  error?: string;
  value?: string;
};

const AppInput: FC<Props> = React.forwardRef(
  (
    { onChange, text, inputType, value, error, ...props },
    ref: Ref<HTMLInputElement>
  ) => {
    const [InputType, isVisible, toggle] = usePasswordVisToggle();
    return (
      <div className={styles.app_input}>
        <label htmlFor={text}>{text}</label>
        <section className={styles.input_section}>
          <input
            onChange={(e) => onChange && onChange(e)}
            className={`${error ? styles.input_error_border : ""} ${
              styles.input_field
            }`}
            type={
              inputType === "password" && InputType === "password"
                ? "password"
                : "text"
            }
            name={text}
            ref={ref}
            {...props}
          />
          {inputType == "password" ? (
            <span className={styles.input_eye_icon}>
              <AppIcon
                icon={isVisible ? "eye-closed" : "eye-open"}
                color="blue"
                onClick={toggle}
              />
            </span>
          ) : null}
        </section>
        {error && <p className={styles.input_error_text}>{error}</p>}
      </div>
    );
  }
);

export default AppInput;
