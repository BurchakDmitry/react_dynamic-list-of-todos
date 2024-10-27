import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  currentTodo: Todo | null;
  setEye: (result: boolean) => void;
  setShow: (value: boolean) => void;
}

export const TodoModal: React.FC<Props> = ({
  currentTodo,
  setEye,
  setShow,
}) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const userFromApi = currentTodo && (await getUser(currentTodo.userId));

        setUser(userFromApi);
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  const onHandleClick = () => {
    setShow(false);
    setEye(false);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onHandleClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  currentTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
