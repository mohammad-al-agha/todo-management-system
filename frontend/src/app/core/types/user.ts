import { Todo } from "./todo";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  todos: Todo[];
};
