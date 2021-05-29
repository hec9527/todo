import React, { Dispatch, DragEventHandler, MouseEventHandler, TouchEventHandler, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { AppActions, AppStore } from '../../store/reducer';

import * as Types from '../../index.d';
import './index.less';

interface TodoListProps {
  todoList: AppStore['todoList'];
  filter: AppStore['filter'];
  changeStatus: (todo: Types.TodoItem) => void;
  delTodo: (todo: Types.TodoItem) => void;
}

interface TodoItemProps {
  todo: Types.TodoItem;
  changeStatus: (todo: Types.TodoItem) => void;
  delTodo: (todo: Types.TodoItem) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo: { status, title }, changeStatus, delTodo }) => {
  const [left, setLeft] = useState(0);
  const isMoving = useRef(false);
  const x = useRef(0);

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    x.current = e.clientX;
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (x.current === 0) return;
    e.stopPropagation();
    setLeft(e.clientX - x.current);
    isMoving.current = true;
  };

  const handleMouseUp: DragEventHandler<HTMLDivElement> = (e) => {
    x.current = 0;
    if (Math.abs(left) > 100) {
      setLeft(left > 0 ? 420 : -420);
      setTimeout(() => {
        setLeft(0);
        delTodo({ title, status });
      }, 100);
    } else {
      setLeft(0);
      setTimeout(() => (isMoving.current = false), 100);
    }
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (e.touches.length > 1) return;
    x.current = e.touches[0].clientX;
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (e.touches.length > 1) return;
    const _x = e.touches[0].clientX;
    setLeft(_x - x.current);
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    x.current = 0;
    if (Math.abs(left) > 100) {
      setLeft(left > 0 ? 420 : -420);
      setTimeout(() => {
        setLeft(0);
        delTodo({ title, status });
      }, 300);
    } else {
      setLeft(0);
    }
  };

  const handleTodoClick = () => {
    if (isMoving) return;
    changeStatus({ title, status });
  };

  return (
    <div
      className='todo-item-wrap'
      draggable={false}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
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

const TodoList: React.FC<TodoListProps> = ({ todoList, filter, changeStatus, delTodo }) => {
  return (
    <div className='todo-list'>
      {todoList
        .filter((todo) => filter === 'all' || todo.status == filter)
        .map((todo, index) => (
          <TodoItem key={todo.title + index} todo={todo} changeStatus={changeStatus} delTodo={delTodo} />
        ))}
    </div>
  );
};

const mapStateToProps = (state: AppStore) => ({ todoList: state.todoList, filter: state.filter });
const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  changeStatus: (todo: Types.TodoItem) => {
    dispatch({
      type: 'CHANGE_STATUS',
      payload: todo,
    });
  },
  delTodo: (todo: Types.TodoItem) => {
    dispatch({
      type: 'DEL_TODO_ITEM',
      payload: todo,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
