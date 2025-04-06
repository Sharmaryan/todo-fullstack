import { useState } from "react";
import { ListProps } from "./List.types";

export const List = ({ todos, onDelete, onUpdate }: ListProps) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const startEditing = (id: string, currentTitle: string) => {
    setEditId(id);
    setEditText(currentTitle);
  };

  const saveEdit = () => {
    if (editId && editText.trim()) {
      onUpdate(editId, editText.trim());
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <ul className="space-y-2 mt-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="bg-white p-3 rounded-xl shadow flex items-center justify-between"
        >
          {editId === todo.id ? (
            <>
              <input
                className="flex-1 mr-2 border p-1 rounded"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button
                className="text-green-600 hover:text-green-800 mr-2 cursor-pointer"
                onClick={saveEdit}
              >
                ✅
              </button>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setEditId(null)}
              >
                ✕
              </button>
            </>
          ) : (
            <>
              <span>{todo.title}</span>
              <div className="flex items-center gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => startEditing(todo.id, todo.title)}
                >
                  ✏️
                </button>
                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => onDelete(todo.id)}
                >
                  ✕
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
