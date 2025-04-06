import { useState } from "react";
import { List } from "./components/List/List";
import { TodoInput } from "./components/TodoInput/TodoInput";

const App = () => {
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Build a Todo App" },
    { id: "3", title: "Profit 🚀" },
    { id: "4", title: "Deploy it online 🌐" },
  ]);

  const addTodo = (title: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        <TodoInput onAdd={addTodo} />
        <List todos={todos} onDelete={deleteTodo} />
      </div>
    </div>
  );
};

export default App;
