import { useEffect, useState } from "react";
import { List } from "./components/List/List";
import { TodoInput } from "./components/TodoInput/TodoInput";
import axios from "axios";
import { Todo } from "./components/List/List.types";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/todos");
        const data = await response.data;
        setTodos(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const addTodo = async (title: string) => {
    const newTodo = {
      title,
    };
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/todos/add",
        newTodo
      );
      const data = resp.data;
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const resp = await axios.delete(`http://localhost:3000/api/todos/${id}`);
      const data = resp.data;
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodo = async (id: string, newTitle: string) => {
    try {
      const updatedTodo = {
        title: newTitle,
      };
      const resp = await axios.patch(
        `http://localhost:3000/api/todos/${id}`,
        updatedTodo
      );
      const data = resp.data;
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        <TodoInput onAdd={addTodo} />
        <List todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
      </div>
    </div>
  );
};

export default App;
