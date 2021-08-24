const logger =
  ({ getState }: { getState(): any }) =>
  (next: any) =>
  (action: any) => {
    console.group(`%c Redux-logger: ${action.type}`, 'color: #909090');
    console.log('%c prev State', 'color: green', getState());
    console.log('%c Action    ', 'color: #abf', action);
    next(action);
    console.log('%c next State', 'color: pink', getState());
    console.groupEnd();
  };

export default logger;
