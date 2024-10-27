import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  eye: boolean;
  currentTodo: Todo | null;
  setEye: (result: boolean) => void;
  setShow: (result: boolean) => void;
  setCurrentTodo: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  eye,
  currentTodo,
  setEye,
  setShow,
  setCurrentTodo,
}) => {
  const onHandleClick = () => {
    setEye(true);
    setShow(true);
    setCurrentTodo(todo);
  };

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      {todo.completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={onHandleClick}
        >
          <span className="icon">
            <i
              className={`far ${currentTodo === todo && eye ? 'fa-eye-slash' : 'fa-eye'} `}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
