import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  currentTodo: Todo | null;
  eye: boolean;
  setEye: (result: boolean) => void;
  setShow: (item: boolean) => void;
  setCurrentTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  eye,
  currentTodo,
  setEye,
  setShow,
  setCurrentTodo,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>
    <tbody>
      {todos.map((todo, index) => (
        <TodoItem
          todo={todo}
          currentTodo={currentTodo}
          eye={eye}
          setEye={setEye}
          setShow={setShow}
          setCurrentTodo={setCurrentTodo}
          key={index + 1}
        />
      ))}
    </tbody>
  </table>
);
