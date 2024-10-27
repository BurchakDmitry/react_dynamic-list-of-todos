import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

// This function creates a promise
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  // we add some delay to see how the loader works
  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getTodos = () => get<Todo[]>('/todos');

export const getAll = () => getTodos().then(todos => todos);
export const getActive = () =>
  getTodos().then(response => response.filter(todo => !todo.completed));

export const getCompleted = () =>
  getTodos().then(response => response.filter(todo => todo.completed));

export const getFinded = (text: string) =>
  getTodos().then(response =>
    response.filter(todo =>
      todo.title.toLowerCase().includes(text.toLowerCase()),
    ),
  );

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
