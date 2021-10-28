import axios from "axios";
import type { TodoItem } from "../types/ActivityGroupDetails";

export const updateTodoItem = (id: number, todoItem: TodoItem) => {
  return axios.patch(`/todo-items/${id}`, todoItem);
};
