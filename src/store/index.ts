import { atom, selector, useRecoilValue } from 'recoil';
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

export const getId = () => ++todoId;

export const todoList = atom<Types.TodoList>({
  key: 'todo-list',
  default: defaultList,
});

export const filter = atom<Types.TodoFilter>({
  key: 'todo-filter',
  default: 'all',
});

export const filteredList = selector<Types.TodoList>({
  key: 'todo-filtered-list',
  get: () => {
    const list = useRecoilValue(todoList);
    const _filter = useRecoilValue(filter);
    return list.filter((item) => item.status === _filter);
  },
});
