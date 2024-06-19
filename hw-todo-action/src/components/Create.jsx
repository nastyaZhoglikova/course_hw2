import React, { useState } from "react";
import { useTodoStore } from "../store/todo.js";
import { useNavigate } from "react-router-dom";
import Form from './Form.jsx'

function Create ()  {
  const navigate = useNavigate()

  const { addTodo } = useTodoStore(
    (state) => ({
      addTodo: state.addTodo
    })
  );

  const [todo, setTodo] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo((prevTodo) => ({...prevTodo, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isOK = await addTodo(todo)

    isOK && navigate("/todo-list", { replace: true });
  };

  return (
    <div>
      <div>
        <div className="font-semibold text-left">
          Adding a new todo:
        </div>
        <Form
          todo={todo}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>

  );
};

export default Create;
