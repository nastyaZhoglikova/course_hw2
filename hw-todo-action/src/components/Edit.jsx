import React, {useEffect, useState} from 'react'
import { useTodoStore } from "../store/todo.js";
import { useNavigate } from "react-router-dom";
import Form from './Form.jsx'

function EditComponent (params)  {
  const navigate = useNavigate();

  const [todo, setTodo] = useState({});
  const { getTodo, updateTodo, error, loading, success } = useTodoStore(
    (state) => ({
      getTodo: state.getTodo,
      updateTodo: state.updateTodo,
      loading: state.loading,
      success: state.success,
      error: state.errorData,
    })
  );

  useEffect(async () => {
    const todoItem = await getTodo(params.todoId);
    todoItem && setTodo(todoItem);
  }, [params]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTodo((prevTodo) => ({...prevTodo, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateTodo(todo)
  };

  return (
    <div>
      <div>
          <div className="font-semibold text-left">
            Edit todo with id {params.todoId}:
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

export default EditComponent;
