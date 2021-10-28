import axios from "axios";

const deleteTodoItem = (id: number) => {
  return axios.delete(`/todo-items/${id}`);
};

export default deleteTodoItem;
