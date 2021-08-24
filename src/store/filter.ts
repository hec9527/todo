import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Types from '../index.d';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: 'all' as Types.TodoFilter,
  reducers: {
    setFilter(state, action: PayloadAction<Types.TodoFilter>) {
      // 如果是不可变类型，不能直接赋值改变，只能返回一个新的值
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
