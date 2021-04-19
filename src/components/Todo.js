import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    title: '',
    description: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      title: '',
      description: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => {
    const createdAt = new Date(todo.createdAt).toLocaleString();

    return (
      <div
        className={todo.isComplete ? 'todoRow complete' : 'todoRow'}
        key={index}
      >
        <div
          key={todo.id}
          onClick={() => completeTodo(todo.id)}
          className="todoData"
        >
          <div className="todoTitle">{todo.title}</div>
          <div className="todoDescription">{todo.description}</div>
          <div className="todoDate">{createdAt}</div>
        </div>
        <div className="icons">
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className="deleteIcon"
          />
          <TiEdit
            onClick={() =>
              setEdit({
                id: todo.id,
                title: todo.title,
                description: todo.description,
              })
            }
            className="editIcon"
          />
        </div>
      </div>
    );
  });
};

export default Todo;
