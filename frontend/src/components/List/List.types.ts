export type Todo = {
    _id: string;
    title: string;
  };
  
  export type ListProps = {
    todos: Todo[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, title: string) => void;
  };