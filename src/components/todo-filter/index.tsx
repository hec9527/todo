import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore, AppDispatch } from '../../store/reducer';
import * as Types from '../../index.d';
import './index.less';

const filters: Types.TodoFilter[] = ['doing', 'done', 'all'];

const TodoFilter: React.FC = () => {
  const filter = useSelector((state: AppStore) => state.filter);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className='todo-filter'>
      <div className='filter-wrap'>
        {filters.map((f) => (
          <div
            key={f}
            className={'filter' + (f === filter ? ' checked' : '')}
            onClick={dispatch.bind(undefined, { type: 'SET_FILTER', payload: f })}
          >
            {f.slice(0, 1).toUpperCase() + f.slice(1).toLowerCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter;
