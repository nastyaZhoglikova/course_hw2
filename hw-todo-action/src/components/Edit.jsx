import React, {useEffect, useState} from 'react'
import { useTodoStore } from "../store/todo.js";
import { useNavigate, useParams } from "react-router-dom";
import Form from './Form.jsx'

function Edit ()  {
  const navigate = useNavigate()
  const { id } = useParams();

  console.log(11111, ' ',id)
  const [todo, setTodo] = useState({});
  const { getTodo, updateTodo, errorMsg } = useTodoStore(
    (state) => ({
      getTodo: state.getTodo,
      updateTodo: state.updateTodo,
      errorMsg: state.errorData
    })
  );

  useEffect(async () => {
    const todoItem = await getTodo(id);
    todoItem && setTodo(todoItem);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo((prevTodo) => ({...prevTodo, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isOK = await updateTodo(todo)

    isOK && navigate("/todo-list", { replace: true });
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
            Edit todo with id {id}:
          </div>
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

export default Edit;
