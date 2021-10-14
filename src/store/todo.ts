import { makeAutoObservable } from 'mobx';
import * as Mock from './mock';
import * as Types from '../index.d';

export class Todo {
  constructor() {
    makeAutoObservable(this);
  }

  todoList: Types.TodoList = Mock.todoList;
  filter: Types.TodoFilter = 'all';
  currentId: number = Mock.todoList.length;

  setFilter(filter: Types.TodoFilter) {
    this.filter = filter;
  }

  addTodo(todo: Omit<Types.TodoItem, 'id'>) {
    this.todoList.push({ ...todo, id: this.currentId++ });
  }

  changeStatus(todo: Types.TodoItem) {
    const cTodo = this.todoList.find((t) => t.id === todo.id);
    if (cTodo) {
      cTodo.status = cTodo.status === 'done' ? 'doing' : 'done';
    }
  }

  delTodo(todo: Types.TodoItem) {
    const index = this.todoList.findIndex((t) => t.id === todo.id);
    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
  }
}

export default new Todo();
