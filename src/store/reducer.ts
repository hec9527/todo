import { combineReducers } from 'redux';
import * as Types from '../index.d';

const defaultList: Types.TodoList = [
  {
    title: '制定2021年成长计划',
    status: 'doing',
  },
  {
    title: '换一部新手机',
    status: 'doing',
  },
  {
    title: '看完红宝书第四版',
    status: 'doing',
  },
  {
    title: '学完Typescript',
    status: 'done',
  },
  {
    title: '学习JavaScript',
    status: 'doing',
  },
  {
    title: 'webpack 5',
    status: 'done',
  },
  {
    title: '学习VueNext',
    status: 'doing',
  },
  {
    title: '写一个后台管理软件',
    status: 'done',
  },
];

export type AppActions =
  | {
      type: 'ADD_TODO_ITEM';
      payload: Types.TodoItem;
    }
  | {
      type: 'DEL_TODO_ITEM';
      payload: Types.TodoItem;
    }
  | {
      type: 'SET_FILTER';
      payload: Types.TodoFilter;
    }
  | {
      type: 'CHANGE_STATUS';
      payload: Types.TodoItem;
    };

export type AppStore = ReturnType<typeof reducer>;

function todoList(state: Types.TodoList = defaultList, action: AppActions) {
  switch (action.type) {
    case 'ADD_TODO_ITEM':
      return [...state, action.payload];

    case 'DEL_TODO_ITEM': {
      return state.filter(i => i.title != action.payload.title);
    }
    case 'CHANGE_STATUS': {
      const s = action.payload;
      const todo = state.find(i => i.status === s.status && i.title === s.title);
      if (todo) {
        todo.status = todo.status === 'doing' ? 'done' : 'doing';
      }
      return [...state];
    }
    default:
      return state;
  }
}

function filter(state: Types.TodoFilter = 'all', action: AppActions) {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({ todoList, filter });

export default reducer;
