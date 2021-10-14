import React, { useEffect, useRef, useState } from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import TodoItem from '../todo-item';
import './index.less';

import * as Types from '../../store';

interface TodoListProps {
  todo: Types.Todo;
}

const TodoList: React.FC<TodoListProps> = observer(({ todo }) => {
  const [isScroll, setScroll] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const divRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    // 移动端滚动的时候禁止左右滑动删除todo
    const handleScroll = () => {
      setScroll(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
      timerRef.current = setTimeout(() => setScroll(false), 30);
    };

    divRef.current?.addEventListener('scroll', handleScroll);
    return () => divRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='todo-list' ref={divRef}>
      {todo.todoList
        .filter((t) => todo.filter === 'all' || t.status == todo.filter)
        .map((t) => (
          <TodoItem
            key={t.id}
            isScroll={isScroll}
            todo={t}
            changeStatus={() => todo.changeStatus(t)}
            delTodo={() => todo.delTodo(t)}
          />
        ))}
    </div>
  );
});

TodoList.displayName = 'TodoItemWrap';

export default inject('todo')(TodoList);
