"use client";

import { useEffect, useRef, useState } from "react";
import TodoActionButton from "../components/actionButton";
import CreatTodoModal from "../components/modal/CreateTodoModal";
import TodoCard from "../components/todo";
import { Todo } from "../core/types/todo";
import { request } from "../utils/request";
import styles from "./styles.module.css";
import AppIcon from "../components/icons";
import { localAction } from "../utils/localAction";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [createModal, setCreateModal] = useState(false);

  const createRef = useRef<HTMLDialogElement>(null);

  const openCreateDialog = () => {
    if (createRef.current) {
      createRef.current.showModal();
    }
  };

  const closeCreateDialog = () => {
    if (createRef.current) {
      createRef.current.close();
    }
  };
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchTodos = async () => {
      const name = await localAction("name");
      setUserName(name!.value);
      try {
        const res = await request({
          method: "GET",
          route: "/todo",
        });

        setTodos(res);
      } catch (e: any) {
        console.log(e);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleUpdate = async (id: number, updatedTodo: Todo) => {
    try {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleCreate = async (newTodo: Todo) => {
    try {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const changeStatus = (id: number, status: boolean) => {
    try {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) {
            todo.completed = status;
          }
          return todo;
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.todo_page}>
      <header className={styles.todo_page_header}>
        <h1 className="header_title">Welcome {userName}</h1>
        <div className={styles.todo_page_actions}>
          <TodoActionButton
            type="add"
            onClick={() => {
              openCreateDialog(), setCreateModal(true);
            }}
          ></TodoActionButton>
          <CreatTodoModal
            createTodo={handleCreate}
            ref={createRef}
            isOpen={createModal}
            onClose={() => {
              closeCreateDialog(), setCreateModal(false);
            }}
          ></CreatTodoModal>
        </div>
      </header>
      <main>
        {todos == null || todos.length < 1 ? (
          <div className={styles.empty_todos}>
            <AppIcon
              icon="empty-task"
              color="grey"
              onClick={() => {}}
            ></AppIcon>
            <p>No Todos Yet</p>
          </div>
        ) : (
          todos.map((todo: Todo) => (
            <TodoCard
              // changeStatus={changeStatus}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              key={todo.id}
              todo={todo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Todos;
