"use client";

import { Todo } from "@/app/core/types/todo";
import React, { useRef, useState } from "react";
import styles from "./styles.module.css";
import TodoActionButton from "../actionButton";
import PriorityTag from "../priorityTag";
import UpdateTodoModal from "../modal/UpdateTodoModal";
import DeleteTodoModal from "../modal/DeleteTodoModal";
import { DateFormat } from "@/app/utils/dateFormat";

type Props = {
  todo: Todo;
  handleDelete: (id: number) => Promise<void>;
  handleUpdate: (id: number, updatedTodo: Todo) => Promise<void>;
};

const TodoCard = ({ todo, handleDelete, handleUpdate }: Props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const updateRef = useRef<HTMLDialogElement>(null);
  const deleteRef = useRef<HTMLDialogElement>(null);

  const openUpdateDialog = () => {
    if (updateRef.current) {
      updateRef.current.showModal();
    }
  };

  const openDeleteDialog = () => {
    if (deleteRef.current) {
      deleteRef.current.showModal();
    }
  };

  const closeUpdateDialog = () => {
    if (updateRef.current) {
      updateRef.current.close();
    }
  };

  const closeDeleteDialog = () => {
    if (deleteRef.current) {
      deleteRef.current.close();
    }
  };

  const todoDate = DateFormat(todo.date);

  return (
    <div className={styles.todo_card}>
      <section className={styles.todo_details}>
        <h2 className={styles.todo_title}>{todo.description}</h2>
        <PriorityTag priority={todo.priority}></PriorityTag>
      </section>
      <section className={styles.todo_actions}>
        <div className={styles.todo_action_buttons}>
          <TodoActionButton
            type="update"
            onClick={() => {
              openUpdateDialog(), setUpdateModal(true);
            }}
          ></TodoActionButton>

          <TodoActionButton
            type="delete"
            onClick={() => {
              openDeleteDialog(), setDeleteModal(true);
            }}
          ></TodoActionButton>

          <UpdateTodoModal
            updateTodo={handleUpdate}
            todo={todo}
            ref={updateRef}
            isOpen={updateModal}
            onClose={() => {
              closeUpdateDialog(), setUpdateModal(false);
            }}
          ></UpdateTodoModal>

          <DeleteTodoModal
            deletesTodo={handleDelete}
            todoId={todo.id}
            ref={deleteRef}
            isOpen={deleteModal}
            onClose={() => {
              closeDeleteDialog(), setDeleteModal(false);
            }}
          ></DeleteTodoModal>
        </div>
        <p className={styles.todo_date}>{todoDate}</p>
      </section>
    </div>
  );
};

export default TodoCard;
