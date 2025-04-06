import { Todo } from "../TodoInput/TodoInput.types";

export type ListProps = {
    todos: Todo[];
    onDelete: (id: string) => void;
};