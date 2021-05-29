export type TodoStatus = 'done' | 'doing';

export type TodoList = TodoItem[];

export type TodoItem = {
  id: number;
  title: string;
  status: TodoStatus;
};

export type TodoFilter = TodoStatus | 'all';
