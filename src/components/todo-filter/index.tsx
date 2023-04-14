import React from 'react';
import { filter } from '../../store';
import { useRecoilState } from 'recoil';
import * as Types from '../../index.d';
import './index.less';

const filters: Types.TodoFilter[] = ['doing', 'done', 'all'];

const TodoFilter: React.FC = () => {
  const [currentFilter, setFilter] = useRecoilState(filter);

  return (
    <div className='todo-filter'>
      <div className='filter-wrap'>
        {filters.map((f) => (
          <div key={f} className={'filter' + (f === currentFilter ? ' checked' : '')} onClick={() => setFilter(f)}>
            {f.slice(0, 1).toUpperCase() + f.slice(1).toLowerCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter;
