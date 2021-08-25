import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Types from '../index.d';

// Ts自动收紧类型的时候，可以使用 as 断言指定类型
const initialState = 'all' as Types.TodoFilter;

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Types.TodoFilter>) {
      // 如果是不可变类型，不能直接赋值改变，只能返回一个新的值
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
