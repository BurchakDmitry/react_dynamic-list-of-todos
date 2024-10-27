/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [show, setShow] = useState(false);
  const [eye, setEye] = useState(false);
  const [loader, setLoader] = useState(true);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const todosFromApi = await getTodos();

        setTodos(todosFromApi);
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setTodos={setTodos} />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  currentTodo={currentTodo}
                  eye={eye}
                  setEye={setEye}
                  setShow={setShow}
                  setCurrentTodo={setCurrentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {show && (
        <TodoModal
          currentTodo={currentTodo}
          setEye={setEye}
          setShow={setShow}
        />
      )}
    </>
  );
};
