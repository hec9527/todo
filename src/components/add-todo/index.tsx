import React, { useEffect, useState, Dispatch, useRef } from 'react';
import { connect } from 'react-redux';
import { AppActions } from '../../store/reducer';
import * as Types from '../../index.d';
import './index.less';

interface AddTodoProps {
  addTodo: (todo: Omit<Types.TodoItem, 'id'>) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const inputRef = React.createRef<HTMLInputElement>();
  const ref = useRef<any>();

  const handlePress: (this: HTMLInputElement, e: KeyboardEvent) => any = (e) => {
    if (e.key === 'Enter' && title.trim() !== '') {
      addTodo({ title, status: 'doing' });
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

const mapStateToProps = (dispatch: Dispatch<AppActions>) => ({
  addTodo: (todo: Omit<Types.TodoItem, 'id'>) => {
    dispatch({
      type: 'ADD_TODO_ITEM',
      payload: todo,
    });
  },
});

export default connect(undefined, mapStateToProps)(AddTodo);
