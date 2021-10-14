import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import * as Types from '../../index.d';
import './index.less';

export interface TodoItemProps {
  isScroll: boolean;
  todo: Types.TodoItem;
  changeStatus: () => void;
  delTodo: () => void;
}

const TodoItem: React.FC<TodoItemProps> = observer(({ todo: { status, title }, changeStatus, delTodo, isScroll }) => {
  const [left, setLeft] = useState(0);
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
        delTodo();
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
        delTodo();
      }, 300);
    } else {
      setLeft(0);
    }
  };

  const handleTodoClick = () => {
    if (isMoving.current) return;
    changeStatus();
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
});

export default TodoItem;
