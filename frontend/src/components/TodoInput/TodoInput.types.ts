export type Todo = {
    id: string;
    title: string;
};

export type TodoInputProps = {
    onAdd: (title: string) => void;
};