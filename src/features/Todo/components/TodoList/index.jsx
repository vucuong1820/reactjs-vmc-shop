import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import "./style.scss"

TodoList.propTypes = {
    todoList: PropTypes.array,
    onClickTodo: PropTypes.func,
};

TodoList.default = {
    todoList: [],
    onClickTodo: null
};

function TodoList( { todoList , onClickTodo } ) {
    console.log(todoList)
    const handleOnClick = (todo,idx) => {
        if(!onClickTodo) return;

        onClickTodo(todo,idx)
    }
    return (
        <ul className='todo-list'>
            {todoList.map((todo, idx) => (
                <li className={classnames({
                    'todo-item': true,
                    completed: todo.status === 'completed'})} 
                key={todo.id}
                onClick={() => handleOnClick(todo,idx)}
                >{todo.title}</li>
            ))}
        </ul>
    );
}

export default TodoList;