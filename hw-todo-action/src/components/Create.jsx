import React, { useState } from "react";
import { useTodoStore } from "../store/todo.js";
import "./Create.css";

const Create = () => {
  const { addTodo } = useTodoStore(
    (state) => ({
      addTodo: state.addTodo
    })
  );

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const todoItem = {
      title,
      text,
      priority,
      date_done: date,
      status: false
    }
    addTodo(todoItem)
  };

  return (
    <div>
      <div className="buttons-card">

      </div>
      <div className="todo-list">
        <div className="font-semibold text-left">
          Adding a new todo:
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="Title"
              type="text"
              name="title"
              required
              className="w-full rounded-md px-4 py-2 bg-inherit border mb-6"
              onChange={handleTitleChange}
              value={title}
            />
          </div>
          <div>
            <input
              placeholder="Task"
              type="text"
              name="text"
              required
              className="w-full rounded-md px-4 py-2 bg-inherit border mb-6"
              onChange={handleTextChange}
              value={text}
            />
          </div>
          <div>
            <input
              placeholder="Priority (1-5)"
              type="number"
              max="5"
              min="1"
              name="priority"
              required
              className="w-full rounded-md px-4 py-2 bg-inherit border mb-6"
              onChange={handlePriorityChange}
              value={priority}
            />
          </div>
          <div>
            <input
              placeholder="Date"
              type="date"
              name="date"
              required
              className="w-full rounded-md px-4 py-2 bg-inherit border mb-6"
              onChange={handleDateChange}
              value={date}
            />
          </div>
          <button
            className="button"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>

  );
};

export default Create;
