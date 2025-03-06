import React from "react";
import AppIcon from "../icons";
import styles from "./styles.module.css";
import { request } from "@/app/utils/request";

type Props = {
  todoId: number;
  isCompleted: boolean;
  changeStatus: (id: number, status: boolean) => void;
};

const CompletedTodoButton = ({ todoId, isCompleted, changeStatus }: Props) => {
  const onStatusChange = async () => {
    await request({
      method: "PATCH",
      route: `todos/${todoId}`,
      body: { completed: !isCompleted },
    });
  };
  return (
    <div
      className={`${styles.completed_button} ${
        isCompleted
          ? styles.completed_button_check
          : styles.completed_button_timer
      }`}
      onClick={() => {
        changeStatus;
      }}
    >
      <AppIcon
        icon={isCompleted ? "check" : "timer"}
        color={isCompleted ? "white" : "orange"}
      ></AppIcon>
    </div>
  );
};

export default CompletedTodoButton;
