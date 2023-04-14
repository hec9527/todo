import React, { useEffect, useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { getId, todoList } from '../../store';
import './index.less';

const AddTodo: React.FC = () => {
  const ref = useRef<any>();
  const [title, setTitle] = useState('');
  const inputRef = React.createRef<HTMLInputElement>();
  const setTodoList = useSetRecoilState(todoList);

  const handlePress: (this: HTMLInputElement, e: KeyboardEvent) => any = (e) => {
    if (e.key === 'Enter' && title.trim() !== '') {
      setTodoList((l) => [...l, { title, status: 'doing', id: getId() }]);
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

export default AddTodo;
