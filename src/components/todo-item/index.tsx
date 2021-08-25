import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { delTodo, change } from '../../store/todo';
import * as Types from '../../index.d';
import './index.less';

export interface TodoItemProps {
  isScroll: boolean;
  todo: Types.TodoItem;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo: { status, title, id }, isScroll }) => {
  const dispatch = useAppDispatch();
  const [left, setLeft] = useState(0);
  const isMoving = useRef(false);
  const timerRef = useRef<number>();
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
      timerRef.current = setTimeout(() => {
        setLeft(0);
        dispatch(delTodo(id));
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
      timerRef.current = setTimeout(() => {
        setLeft(0);
        dispatch(delTodo(id));
      }, 300);
    } else {
      setLeft(0);
    }
  };

  const handleTodoClick = () => {
    if (isMoving.current) return;
    dispatch(change(id));
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

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
        <div className='checkBox' />
        <p className='title'>{title}</p>
      </div>
    </div>
  );
};

export default TodoItem;
