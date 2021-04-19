import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function TodoList() {
  const [todos, setTodos] = useState(cookies.get('myTodos') || []);
  const [showCompleted, setShowCompleted] = useState(true);

  const addTodo = (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newTodo) => {
    if (!newTodo.title || /^\s*$/.test(newTodo.title)) {
      return;
    }

    setTodos((prev) =>
      prev.map((todo) => (todo.id === todoId ? newTodo : todo))
    );
  };

  const removeTodo = (id) => {
    const removedArray = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArray);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    cookies.set('myTodos', todos, {
      path: '/',
      expires: new Date(Date.now() + 60 * 60 * 24 * 365),
      maxAge: 60 * 60 * 24 * 365,
    });
  }, [todos]);

  return (
    <>
      <h1>What's the Plan?!</h1>
      <TodoForm onSubmit={addTodo} />
      {todos.length > 0 && (
        <>
          <div className="filters">
            <input
              type="checkbox"
              id="complete"
              name="complete"
              checked={showCompleted}
              onClick={() => setShowCompleted(!showCompleted)}
            />
            <label for="complete"> show completed </label>
          </div>

          <Todo
            todos={
              showCompleted
                ? todos
                : todos.filter((todo) => todo.isComplete === false)
            }
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </>
      )}
    </>
  );
}

export default TodoList;
