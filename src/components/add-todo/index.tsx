import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/reducer';
import './index.less';

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const inputRef = React.createRef<HTMLInputElement>();
  const handlePressRef = useRef<any>();
  const dispatch: AppDispatch = useDispatch();

  const handlePress: (this: HTMLInputElement, e: KeyboardEvent) => any = (e) => {
    if (e.key === 'Enter' && title.trim() !== '') {
      dispatch({ type: 'ADD_TODO_ITEM', payload: { title, status: 'doing' } });
      setTitle('');
    }
  };

  // 保存最新的引用，否则函数内部无法获取到最新的title属性
  handlePressRef.current = handlePress;

  useEffect(() => {
    inputRef.current?.addEventListener('keydown', (e) => handlePressRef.current?.(e));
    return () => {
      inputRef.current?.removeEventListener('keydown', (e) => handlePressRef.current?.(e));
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
