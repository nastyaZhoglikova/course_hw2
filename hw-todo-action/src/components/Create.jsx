import React, {useEffect, useState} from 'react'
import { useTodoStore } from "../store/todo.js";
import Form from './Form.jsx'

function Create ()  {
  const { addTodo, loading, success, error, setDefaultState } = useTodoStore(
    (state) => ({
      addTodo: state.addTodo,
      loading: state.loading,
      success: state.success,
      error: state.errorData,
      setDefaultState: state.setDefaultState,
    })
  );

  const [todo, setTodo] = useState({});

  useEffect(() => {
    setDefaultState()
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo((prevTodo) => ({...prevTodo, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addTodo(todo)
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
          success={success}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Create;
