// @flow

export type Id = number;

export type Todo = {
  description: string,
  completed: boolean,
  id: Id,
};

export const newTodo = (description: string, id: number, app: App): any => {
  const convertedDiscription = description.toLocaleLowerCase();
  const value = app.todos.some((el) => el.description === convertedDiscription);
  return value? '' : { description: convertedDiscription, completed: false, id };
};

export type Filter = "/" | "/active" | "/completed";

export type App = {
  todos: Todo[],
  focus: ?Id,
  filter: Filter,
  nextId: Id,
};

export const emptyApp: App = {
  todos: [],
  focus: null,
  filter: "/",
  nextId: 0,
};

export const completedCount = ({ todos }: App): number => todos.reduce(countIfCompleted, 0);

const countIfCompleted = (count: number,  todos: Todo) => count + (todos.completed ? 1 : 0);

const getTodos = (app: App, description: string, id: number) => {
  const newTodoValue = newTodo(description, id, app);
  return  newTodoValue === ''? app.todos : app.todos.concat(newTodoValue)
};

export const addTodo =
  (description: string):any =>
  (app: App): App => ({
    ...app,
    nextId: app.nextId + 1,
    todos: getTodos(app, description, app.nextId),
    // todos: app.todos.concat([newTodo(description, app.nextId, app)]),
  });

export const removeTodo =
  (id: Id):any =>
  (app: App): App => ({
    ...app,
    todos: app.todos.filter((todo) => todo.id !== id),
  });

export const updateCompleted = (completed: boolean, id: Id): any => (app: App) => {
  return {
    ...app,
    todos: app.todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
  };
};

export const updateAllCompleted = (completed: boolean):any => (app: App) => ({
  ...app,
  todos: app.todos.map((todo) => ({ ...todo, completed })),
});

export const removeAllCompleted = (app: App): App => ({
  ...app,
  todos: app.todos.filter((todo) => !todo.completed),
});
export const setFilter =
  (filter: Filter): any =>
  (app: App): App => ({
    ...app,
    filter,
  });
