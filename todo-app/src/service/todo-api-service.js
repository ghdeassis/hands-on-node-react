import axios from "axios";

const baseUrl = "http://localhost:8080/";

const getTodos = async () => {
  const resp = await axios.get(baseUrl + "todo");
  return resp.data.todos;
}

const saveTodo = async (description) => {
  const resp = await axios.post(baseUrl + "todo", { description });
  return resp.data.todos;
}

const deleteTodo = async (id) => {
  const resp = await axios.delete(baseUrl + "todo/" + id);
  return resp.data.todos;
}

export { getTodos, saveTodo, deleteTodo }