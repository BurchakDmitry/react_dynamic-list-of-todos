import { Todo } from '../../types/Todo';
import { getAll, getActive, getCompleted, getFounded } from '../../api';
import { useState, useEffect } from 'react';
import { Option } from '../Option';

interface Props {
  setTodos: (value: Todo[]) => void;
}

export const TodoFilter: React.FC<Props> = ({ setTodos }) => {
  const [inputSearch, setInputSearch] = useState('');
  const [close, setClose] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const loadTodosByFilter = async () => {
    if (filter === 'active') {
      return getActive();
    } else if (filter === 'completed') {
      return getCompleted();
    } else {
      return getAll();
    }
  };

  useEffect(() => {
    const applyFilterAndSearch = async () => {
      let filteredTodos = await loadTodosByFilter();

      if (inputSearch.trim()) {
        filteredTodos = await getFounded(inputSearch);

        if (filter === 'active') {
          filteredTodos = filteredTodos.filter(todo => !todo.completed);
        } else if (filter === 'completed') {
          filteredTodos = filteredTodos.filter(todo => todo.completed);
        }
      }

      setTodos(filteredTodos);
    };

    applyFilterAndSearch();
  }, [filter, inputSearch, setTodos]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
    setClose(!!event.target.value);
  };

  const handleCloseClick = () => {
    setInputSearch('');
    setClose(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as 'all' | 'active' | 'completed');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
            value={filter}
          >
            {['All', 'Active', 'Completed'].map(item => (
              <Option optionValue={item} key={item} />
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputSearch}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {close && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCloseClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
