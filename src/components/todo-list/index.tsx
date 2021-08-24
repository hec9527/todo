import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/reducer';
import TodoItem from '../todo-item';
import './index.less';

interface TodoListProps {
  todoList: AppStore['todoList'];
  filter: AppStore['filter'];
  changeStatus: (id: number) => void;
  delTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = () => {
  const { todoList, filter } = useSelector((state: AppStore) => ({ todoList: state.todoList, filter: state.filter }));
  const [isScroll, setScroll] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const divRef = React.createRef<HTMLDivElement>();
  const handleRef = useRef<(this: HTMLDivElement, e: HTMLElementEventMap['scroll']) => any>(() => {
    setScroll(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    } else {
      timerRef.current = setTimeout(() => setScroll(false), 30);
    }
  });

  useEffect(() => {
    divRef.current?.addEventListener('scroll', handleRef.current);
    return () => {
      divRef.current?.removeEventListener('scroll', handleRef.current);
    };
  }, []);

  return (
    <div className='todo-list' ref={divRef}>
      {todoList
        .filter((todo) => filter === 'all' || todo.status == filter)
        .map((todo, index) => (
          <TodoItem key={todo.title + index} isScroll={isScroll} todo={todo} />
        ))}
    </div>
  );
};

export default TodoList;
