"use client";

import { request } from "@/app/utils/request";
import styles from "./Dialog.module.css";

type Props = {
  ref: React.RefObject<HTMLDialogElement | null>;
  isOpen: boolean;
  onClose: () => void;
  todoId: number;
  deletesTodo: (id: number) => Promise<void>;
};
const DeleteTodoModal = ({
  todoId,
  isOpen,
  onClose,
  ref,
  deletesTodo,
}: Props) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const response = await request({
        method: "DELETE",
        route: `/todo/${todoId}`,
      });

      deletesTodo(todoId);

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <dialog className={styles.dialog} ref={ref}>
      <header>
        <h2>Delete this Todo?</h2>
      </header>
      <div className={styles.dialog_actions}>
        <button
          className="button_green"
          onClick={() => {
            handleDelete(), onClose();
          }}
        >
          Confirm
        </button>
        <button className="button_red" onClick={onClose}>
          Cancel
        </button>
      </div>
    </dialog>
  );
};

export default DeleteTodoModal;
