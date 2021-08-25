import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import todoReducer from './todo';
import filterReducer from './filter';
import logger from '../util/logger';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    filter: filterReducer,
  },
  middleware: [logger],
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

/** 导出这两个带类型的 hooks， 使用的时候可以减少样板代码 */

export const useAppSelect: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
