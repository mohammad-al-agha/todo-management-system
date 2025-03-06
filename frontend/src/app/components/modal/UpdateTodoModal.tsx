"use client";

import { Todo } from "@/app/core/types/todo";
import AppInput from "../inputs";

import styles from "./Dialog.module.css";
import { useState } from "react";
import { request } from "@/app/utils/request";
import AppIcon from "../icons";

type Props = {
  ref: React.RefObject<HTMLDialogElement | null>;
  isOpen: boolean;
  onClose: () => void;
  todo: Todo;
  updateTodo: (id: number, updatedTodo: Todo) => Promise<void>;
};

const UpdateTodoModal = ({ todo, ref, isOpen, onClose, updateTodo }: Props) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState<1 | 2 | 3>(3);
  const [status, setStatus] = useState(todo.completed);

  const today = new Date().toISOString().split("T")[0];

  const handleUpdateTodo = async () => {
    console.log(date);
    try {
      const response = await request({
        method: "PATCH",
        route: `/todo/${todo.id}`,
        body: {
          description: title,
          date: new Date(date).toISOString(),
          priority: priority,
          completed: status,
        },
      });

      updateTodo(todo.id, response);

      console.log(response);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <dialog className={styles.dialog} ref={ref}>
      <header>
        <h2>Update Todo</h2>
      </header>
      <main>
        <AppInput
          inputType="text"
          text="Title"
          value={todo.description}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={styles.dialog_section}>
          <label htmlFor="date">Due Date:</label>
          <input
            type="date"
            name="date"
            min={today}
            defaultValue={today}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className={styles.wrapper}>
          <p className={styles.modal_label}>Priority:</p>
          <div
            className={`${styles.priority_button} ${
              priority == 1 ? styles.priority_high : styles.priority_disabled
            }`}
            onClick={() => setPriority(1)}
          >
            <p
              className={
                priority == 1
                  ? styles.priority_high_text
                  : styles.priority_disabled_text
              }
            >
              High
            </p>
          </div>
          <div
            className={`${styles.priority_button} ${
              priority == 2 ? styles.priority_medium : styles.priority_disabled
            }`}
            onClick={() => setPriority(2)}
          >
            <p
              className={
                priority == 2
                  ? styles.priority_medium_text
                  : styles.priority_disabled_text
              }
            >
              Meduim
            </p>
          </div>
          <div
            className={`${styles.priority_button} ${
              priority == 3 ? styles.priority_low : styles.priority_disabled
            }`}
            onClick={() => setPriority(3)}
          >
            <p
              className={
                priority == 3
                  ? styles.priority_low_text
                  : styles.priority_disabled_text
              }
            >
              Low
            </p>
          </div>
        </div>
        <div className={styles.wrapper}>
          <p className={styles.modal_label}>Status:</p>
          <div
            className={`${styles.completed_button} ${
              status
                ? styles.completed_button_check
                : styles.completed_button_disabled
            }`}
            onClick={() => setStatus((prev) => !prev)}
          >
            <p
              className={
                status
                  ? styles.completed_button_text
                  : styles.completed_button_text_disabled
              }
            >
              Completed
            </p>
            <AppIcon icon={"check"} color={"white"} size={16}></AppIcon>
          </div>
          <div
            className={`${styles.completed_button} ${
              status
                ? styles.completed_button_disabled
                : styles.completed_button_timer
            }`}
            onClick={() => setStatus((prev) => !prev)}
          >
            <p
              className={
                status
                  ? styles.completed_button_text_disabled
                  : styles.completed_button_text
              }
            >
              Not Competed
            </p>
            <AppIcon
              icon={"timer"}
              color={status ? "white" : "orange"}
              size={16}
            ></AppIcon>
          </div>
        </div>
      </main>
      <div className={styles.dialog_actions}>
        <button
          className="button_green"
          onClick={() => {
            handleUpdateTodo(), onClose();
          }}
        >
          Submit
        </button>
        <button className="button_red" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default UpdateTodoModal;
