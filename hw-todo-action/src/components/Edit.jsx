import React, {useEffect, useState} from 'react'
import { useTodoStore } from "../store/todo.js";
import { useNavigate, Link } from "react-router-dom";
import Form from './Form.jsx'

function EditComponent (params)  {
  const navigate = useNavigate();

  const [todo, setTodo] = useState({});
  const { getTodo, updateTodo, errorMsg } = useTodoStore(
    (state) => ({
      getTodo: state.getTodo,
      updateTodo: state.updateTodo,
      errorMsg: state.errorData
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
    const isOK = await updateTodo(todo)

    isOK && navigate("/todo-list", { replace: true });
  };

  const handleToAddTodo = () => {
    navigate("/todo-action", { replace: true });
  };

  return (
    <div>
      <div className="buttons-card">
        <div>
          { errorMsg }
        </div>
        <div></div>
      </div>
      { !errorMsg && (
        <div>
          <div className="font-semibold text-left">
            Edit todo with id {params.todoId}:
          </div>v
          <Form
            todo={todo}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
        </div>
      )}

    </div>

  );
};

export default EditComponent;
