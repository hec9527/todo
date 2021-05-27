import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppStore, AppActions } from '../../store/reducer';
import * as Types from '../../index.d';
import './index.less';

interface IFilterProps {
  filter: Types.TodoFilter;
  setFilter: (f: Types.TodoFilter) => void;
}

const filters: Types.TodoFilter[] = ['doing', 'done', 'all'];

const TodoFilter: React.FC<IFilterProps> = ({ filter, setFilter }) => {
  return (
    <div className='todo-filter'>
      <div className='filter-wrap'>
        {filters.map(f => (
          <div key={f} className={'filter' + (f === filter ? ' checked' : '')} onClick={() => setFilter(f)}>
            {f.slice(0, 1).toUpperCase() + f.slice(1).toLowerCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppStore) => ({ filter: state.filter });
const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  setFilter: (filter: Types.TodoFilter) => {
    dispatch({
      type: 'SET_FILTER',
      payload: filter,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilter);
