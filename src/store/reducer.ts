import { combineReducers } from 'redux';
import * as Types from '../index.d';

const defaultList: Types.TodoList = [
  {
    id: 1,
    title: '制定2021年成长计划',
    status: 'doing',
  },
  {
    id: 2,
    title: '换一部新手机',
    status: 'doing',
  },
  {
    id: 3,
    title: '看完红宝书第四版',
    status: 'doing',
  },
  {
    id: 4,
    title: '学完Typescript',
    status: 'done',
  },
  {
    id: 5,
    title: '学习JavaScript',
    status: 'doing',
  },
  {
    id: 6,
    title: 'webpack 5',
    status: 'done',
  },
  {
    id: 7,
    title: '学习VueNext',
    status: 'doing',
  },
  {
    id: 8,
    title: '写一个后台管理软件',
    status: 'done',
  },
];

let todoId = defaultList.length;

export type AppActions =
  | {
      type: 'ADD_TODO_ITEM';
      payload: Omit<Types.TodoItem, 'id'>;
    }
  | {
      type: 'DEL_TODO_ITEM';
      payload: number;
    }
  | {
      type: 'SET_FILTER';
      payload: Types.TodoFilter;
    }
  | {
      type: 'CHANGE_STATUS';
      payload: number;
    };

export type AppStore = ReturnType<typeof reducer>;

function todoList(state: Types.TodoList = defaultList, action: AppActions) {
  switch (action.type) {
    case 'ADD_TODO_ITEM':
      return [...state, { ...action.payload, id: ++todoId }];

    case 'DEL_TODO_ITEM': {
      return state.filter((i) => i.id != action.payload);
    }
    case 'CHANGE_STATUS': {
      const todo = state.find((i) => i.id === action.payload);
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
