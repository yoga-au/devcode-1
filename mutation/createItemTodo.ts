import axios from "axios";
import type NewItemTodoType from "../types/NewItemTodoType";

const createItemTodo = (activityId: string, newItemTodo: NewItemTodoType) => {
  return axios.post("/todo-items", newItemTodo);
};

export default createItemTodo;
