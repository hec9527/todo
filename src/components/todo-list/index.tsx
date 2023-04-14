import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoList, filter } from '../../store';
import TodoItem from '../todo-item';
import './index.less';

const TodoList: React.FC = () => {
  const [isScroll, setScroll] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const [list, setTodoList] = useRecoilState(todoList);
  const _filter = useRecoilValue(filter);

  const changeTodoItemStatus = (id: number) => {
    setTodoList((l) =>
      l.map((item) => {
        if (item.id !== id) return item;
        return { ...item, status: item.status === 'doing' ? 'done' : 'doing' };
      })
    );
  };

  const deleteTodoItem = (id: number) => {
    setTodoList((l) => l.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const handleRef = () => {
      setScroll(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      } else {
        timerRef.current = setTimeout(() => setScroll(false), 30);
      }
    };

    divRef.current?.addEventListener('scroll', handleRef);
    return () => {
      divRef.current?.removeEventListener('scroll', handleRef);
    };
  }, []);

  return (
    <div className='todo-list' ref={divRef}>
      {list
        .filter((todo) => _filter === 'all' || todo.status == _filter)
        .map((todo, index) => (
          <TodoItem
            todo={todo}
            isScroll={isScroll}
            key={todo.title + index}
            delTodo={deleteTodoItem}
            changeStatus={changeTodoItemStatus}
          />
        ))}
    </div>
  );
};

export default TodoList;
