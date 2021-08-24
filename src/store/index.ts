import { configureStore } from '@reduxjs/toolkit';
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

export default store;
