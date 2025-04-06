import { ListProps } from "./List.types";

export const List = ({ todos, onDelete }: ListProps) => {
  return (
    <ul className="space-y-2 mt-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="bg-white p-3 rounded-xl shadow flex items-center justify-between"
        >
          <span>{todo.title}</span>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
};
