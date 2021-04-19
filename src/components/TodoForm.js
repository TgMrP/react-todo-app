import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function TodoForm(props) {
  const [title, setTitle] = useState(props.edit ? props.edit.title : '');
  const [description, setDescription] = useState(
    props.edit ? props.edit.description : ''
  );

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, [titleRef]);

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      if (form.elements[index + 1].tagName === 'BUTTON') {
        form.elements[index + 1].click();
        form.elements[0].focus();
      } else {
        form.elements[index + 1].focus();
      }
      event.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: uuidv4(),
      title: title,
      description: description,
      isComplete: false,
      createdAt: new Date(),
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        name="title"
        className={props.edit ? 'todoInput edit' : 'todoInput'}
        onChange={(e) => setTitle(e.target.value)}
        ref={titleRef}
        onKeyDown={handleEnter}
        autoComplete="off"
      />
      <textarea
        placeholder="Tell us more"
        name="description"
        value={description}
        className={props.edit ? 'todoTextarea edit' : 'todoTextarea'}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleEnter}
      ></textarea>
      {props.edit ? (
        <button className="todoButton edit">Update</button>
      ) : (
        <button className="todoButton">Add Todo</button>
      )}
    </form>
  );
}

export default TodoForm;
