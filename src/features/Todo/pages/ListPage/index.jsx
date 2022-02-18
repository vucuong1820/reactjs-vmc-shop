import React, { useEffect, useMemo, useState } from 'react';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';
import queryString from 'query-string';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'new',
    },
  ];
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState(initTodoList);
  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || 'all';
  });
  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilteredStatus(params.status || 'all');
  }, [location.search]);
  const handleOnTodo = (todo, idx) => {
    const newTodoList = [...todoList];

    newTodoList[idx] = {
      ...todo,
      status: todo.status === 'new' ? 'completed' : 'new',
    };

    setTodoList(newTodoList);
  };

  const handleShowAll = () => {
    // setFilteredStatus('all')
    const queryParams = { status: 'all' };
    history.push({
      path: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowCompleted = () => {
    // setFilteredStatus('completed')
    const queryParams = { status: 'completed' };
    history.push({
      path: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowNew = () => {
    // setFilteredStatus('new')
    const queryParams = { status: 'new' };
    history.push({
      path: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const renderedList = useMemo(() => {
    return todoList.filter((todo) => filteredStatus === 'all' || filteredStatus === todo.status);
  }, [todoList, filteredStatus])

  // const handleTodoFormSubmit = (formValues) => {
  //   const newTodo = {
  //     id: todoList.length + 1,
  //     ...formValues,
  //   };
  //   const newTodoList = [...todoList];
  //   newTodoList.push(newTodo);
  //   setTodoList(newTodoList);
  // };

  const handleTodoFormSubmit = (values) => {
    const newTodo = {
      id: Date.now(),
      title: values.title,
      status: 'new'
    }

    const newTodoList = [...todoList]
    newTodoList.push(newTodo)
    setTodoList(newTodoList)
  }
  return (
    <div>
      <h3>What to do</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />

      <h3>Todo List</h3>
      <TodoList onClickTodo={handleOnTodo} todoList={renderedList} />

      <div>
        <button onClick={handleShowAll}>Show All</button>
        <button onClick={handleShowCompleted}>Show Completed</button>
        <button onClick={handleShowNew}>Show New</button>
      </div>

    </div>
  );
}

export default ListPage;
