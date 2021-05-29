import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore } from '../../store/reducer';

import * as Types from '../../index.d';
import './index.less';

interface TodoItemProps {
  isScroll: boolean;
  todo: Types.TodoItem;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo: { status, title, id }, isScroll }) => {
  const [left, setLeft] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const isMoving = useRef(false);
  const x = useRef(0);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    x.current = e.clientX;
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (x.current === 0) return;
    e.stopPropagation();
    setLeft(e.clientX - x.current);
    isMoving.current = true;
  };

  const handleMouseUp: React.DragEventHandler<HTMLDivElement> = (e) => {
    setTimeout(() => (isMoving.current = false), 0);
    x.current = 0;
    if (Math.abs(left) > 100) {
      setLeft(left > 0 ? 420 : -420);
      setTimeout(() => {
        setLeft(0);
        dispatch({ type: 'DEL_TODO_ITEM', payload: id });
      }, 100);
    } else {
      setLeft(0);
    }
  };

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (e.touches.length > 1) return;
    x.current = e.touches[0].clientX;
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (isScroll) return;
    e.stopPropagation();
    if (e.touches.length > 1) return;
    const _x = e.touches[0].clientX;
    setLeft(_x - x.current);
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    x.current = 0;
    if (Math.abs(left) > 100) {
      setLeft(left > 0 ? 420 : -420);
      setTimeout(() => {
        setLeft(0);
        dispatch({ type: 'DEL_TODO_ITEM', payload: id });
      }, 300);
    } else {
      setLeft(0);
    }
  };

  const handleTodoClick = () => {
    if (isMoving.current) return;
    dispatch({ type: 'CHANGE_STATUS', payload: id });
  };

  return (
    <div
      className='todo-item-wrap'
      draggable={false}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{ left: `${left}px`, filter: `opacity(${1 - Math.abs(left) / 300})` }}
        className={'todo-item' + (status === 'done' ? ' done' : '')}
        onClick={handleTodoClick}
      >
        <div className='checkBox'></div>
        <p className='title'>{title}</p>
      </div>
    </div>
  );
};

const TodoList: React.FC = () => {
  const { todoList, filter } = useSelector((state: AppStore) => ({ todoList: state.todoList, filter: state.filter }));
  const [isScroll, setScroll] = useState(false);
  const timerRef = useRef<number>();
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
