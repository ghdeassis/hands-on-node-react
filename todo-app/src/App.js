import './App.css';
import { useEffect, useState } from 'react';
import { getTodos, saveTodo, deleteTodo } from "./service/todo-api-service.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => load(), []);

  const load = async () => {
    try {
      const resp = await getTodos();
      setTodos(resp);
    } catch (err) {
      console.log(err);
      alert("Erro ao carregar todos.");
    }
  }

  const save = async () => {
    if (description) {
      try {
        const resp = await saveTodo(description);
        setTodos(resp);
        setDescription("");
      } catch (err) {
        console.log(err.message);
        alert("Erro ao salvar todo.");
      }
    } else {
      alert("Descrição é obrigatória.");
    }
  }

  const remove = async (id) => {
    try {
      const resp = await deleteTodo(id);
      setTodos(resp);
    } catch (err) {
      console.log(err.message);
      alert("Erro ao excluir todo.")
    }
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <label for="description">Descrição:</label>
      <input id="description" class="custom-input" value={description} onChange={event => setDescription(event.target.value)}></input>
      <button class="custom-button" onClick={save}>Salvar</button>
      {todos.map((todo) =>
        <div className="item">
          <span className="item-label">{todo.id} - {todo.description}</span>          
          <button class="custom-button" onClick={() => remove(todo.id)}>Excluir</button>
        </div>
      )}
    </div>
  );
}

export default App;
