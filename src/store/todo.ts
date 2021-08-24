/**
 * state 分片
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Types from '../index.d';

const initialState: Types.TodoList = [
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

let id = initialState.length;

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Omit<Types.TodoItem, 'id'>>) {
      // redux-toolkit使用可变数据，针对对象，直接修改值，不需要返回新的对象
      state.push({ ...action.payload, id: ++id });
    },
    delTodo(state, action: PayloadAction<number>) {
      const index = state.findIndex((t) => t.id === action.payload);
      state.splice(index, 1);
    },
    change(state, action: PayloadAction<number>) {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.status = todo.status === 'doing' ? 'done' : 'doing';
      }
    },
  },
});

export const { addTodo, delTodo, change } = todoSlice.actions;

export default todoSlice.reducer;
