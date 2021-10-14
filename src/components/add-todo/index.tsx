import React, { useEffect, useState, useRef } from 'react';
import { inject } from 'mobx-react';
import * as Types from '../../store';
import './index.less';

interface AddTodoProps {
  todo: Types.Todo;
}

const AddTodo: React.FC<AddTodoProps> = ({ todo }) => {
  const [title, setTitle] = useState('');
  const inputRef = React.createRef<HTMLInputElement>();
  const ref = useRef<any>();

  const handlePress: (this: HTMLInputElement, e: KeyboardEvent) => any = (e) => {
    if (e.key === 'Enter' && title.trim() !== '') {
      todo.addTodo({ title, status: 'doing' });
      setTitle('');
    }
  };

  // 保存最新的引用，否则函数内部无法获取到最新的title属性
  ref.current = handlePress;

  useEffect(() => {
    inputRef.current?.addEventListener('keydown', (e) => ref.current?.(e));
    return () => {
      inputRef.current?.removeEventListener('keydown', (e) => ref.current?.(e));
    };
  }, []);

  return (
    <div className='todo-add'>
      <input
        ref={inputRef}
        maxLength={18}
        type='text'
        className='input'
        placeholder='Something to type in ...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default inject('todo')(AddTodo);
