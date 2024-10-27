import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  currentTodo: Todo | null;
  setCurrentTodo: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  currentTodo,
  setCurrentTodo,
}) => {
  const handleClick = () => {
    setCurrentTodo(todo);
  };

  const { title, id, completed } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
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
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleClick}
        >
          <span className="icon">
            <i
              className={`far ${currentTodo?.id === id ? 'fa-eye-slash' : 'fa-eye'} `}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
