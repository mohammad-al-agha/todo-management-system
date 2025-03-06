"use client";

import AppIcon from "../icons";
import styles from "./styles.module.css";

type Props = {
  type: "delete" | "update" | "add";
  onClick?: () => void;
};

const TodoActionButton = ({ type, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      className={`${styles.action_button} ${
        type == "delete"
          ? styles.action_button_delete
          : styles.action_button_update
      }`}
    >
      <AppIcon icon={type} color="white" size={14}></AppIcon>
    </div>
  );
};

export default TodoActionButton;
