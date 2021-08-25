import React, { useEffect, useRef, useState } from 'react';
import { useAppSelect } from '../../store';
import TodoItem from '../todo-item';
import './index.less';

const TodoList: React.FC = () => {
  const [todoList, filter] = useAppSelect((s) => [s.todo, s.filter] as const);
  const [isScroll, setScroll] = useState(false);
  const timerRef = useRef<number>();
  const divRef = React.createRef<HTMLDivElement>();
  const handleRef = useRef<(this: HTMLDivElement, e: HTMLElementEventMap['scroll']) => any>(() => {
    setScroll(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => setScroll(false), 30);
  });

  useEffect(() => {
    divRef.current?.addEventListener('scroll', handleRef.current);
    return () => {
      divRef.current?.removeEventListener('scroll', handleRef.current);
      timerRef.current && clearTimeout(timerRef.current);
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
