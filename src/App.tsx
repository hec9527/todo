import * as React from 'react';

import TodoFilter from './components/todo-filter';
import TodoTitle from './components/todo-title';
import TodoList from './components/todo-list';
import AddTodo from './components/add-todo';

import './index.less';

const App: React.FC = () => {
  return (
    <div className='todo-container'>
      <TodoTitle />
      <TodoFilter />
      <TodoList />
      <AddTodo />
    </div>
  );
};

export default App;
