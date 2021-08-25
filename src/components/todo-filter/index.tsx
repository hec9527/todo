import React from 'react';
import { useAppDispatch, useAppSelect } from '../../store';
import { setFilter } from '../../store/filter';
import * as Types from '../../index.d';
import './index.less';

const filters: Types.TodoFilter[] = ['doing', 'done', 'all'];

const TodoFilter: React.FC = () => {
  const filter = useAppSelect((s) => s.filter);
  const dispatch = useAppDispatch();

  const handleClick = (filter: Types.TodoFilter) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className='todo-filter'>
      <div className='filter-wrap'>
        {filters.map((f) => (
          <div key={f} className={'filter' + (f === filter ? ' checked' : '')} onClick={handleClick.bind(undefined, f)}>
            {f.slice(0, 1).toUpperCase() + f.slice(1).toLowerCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter;
