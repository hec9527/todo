import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { AppActions, AppStore } from '../../store/reducer';
import TodoItem from '../todo-item';
import './index.less';

interface TodoListProps {
  todoList: AppStore['todoList'];
  filter: AppStore['filter'];
  changeStatus: (id: number) => void;
  delTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todoList, filter, changeStatus, delTodo }) => {
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
          <TodoItem
            key={todo.title + index}
            isScroll={isScroll}
            todo={todo}
            changeStatus={changeStatus}
            delTodo={delTodo}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (state: AppStore) => ({ todoList: state.todoList, filter: state.filter });
const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  changeStatus: (id: number) => {
    dispatch({
      type: 'CHANGE_STATUS',
      payload: id,
    });
  },
  delTodo: (id: number) => {
    dispatch({
      type: 'DEL_TODO_ITEM',
      payload: id,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
