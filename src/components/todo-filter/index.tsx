import React from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import * as Types from '../../index.d';
import * as StoreType from '../../store';
import './index.less';

interface IFilterProps {
  todo: StoreType.Todo;
}

const filters: Types.TodoFilter[] = ['doing', 'done', 'all'];

const TodoFilter: React.FC<IFilterProps> = observer(({ todo }) => {
  return (
    <div className='todo-filter'>
      <div className='filter-wrap'>
        {filters.map((f) => (
          <div
            key={f}
            className={classNames('filter', { checked: f === todo.filter })}
            onClick={() => todo.setFilter(f)}
          >
            {f.slice(0, 1).toUpperCase() + f.slice(1).toLowerCase()}
          </div>
        ))}
      </div>
    </div>
  );
});

export default inject('todo')(TodoFilter);
