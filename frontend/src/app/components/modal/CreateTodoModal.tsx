"use client";

import { useState } from "react";
import AppInput from "../inputs";

import styles from "./Dialog.module.css";
import { request } from "@/app/utils/request";
import { Todo } from "@/app/core/types/todo";
import AppIcon from "../icons";

type Props = {
  ref: React.RefObject<HTMLDialogElement | null>;
  isOpen: boolean;
  onClose: () => void;
  createTodo: (newTodo: Todo) => Promise<void>;
};

const CreatTodoModal = ({ ref, isOpen, onClose, createTodo }: Props) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState<1 | 2 | 3>(3);

  const today = new Date().toISOString().split("T")[0];

  const handleCreateTodo = async () => {
    try {
      const response = await request({
        method: "POST",
        route: "/todo",
        body: {
          description: title,
          date: new Date(date).toISOString(),
          priority: priority,
        },
      });

      createTodo(response);

      console.log(response);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <dialog className={styles.dialog} ref={ref}>
      <header>
        <h2>Create a Todo</h2>
      </header>
      <main>
        <AppInput
          inputType="text"
          text="Title"
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
                  : styles.priority_diabled_text
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
                  : styles.priority_diabled_text
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
                  : styles.priority_diabled_text
              }
            >
              Low
            </p>
          </div>
        </div>
      </main>
      <div className={styles.dialog_actions}>
        <button
          className="button_green"
          onClick={() => {
            handleCreateTodo(), onClose();
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

export default CreatTodoModal;
