import React, {useEffect, useState} from 'react'
import { useTodoStore } from "../store/todo.js";
import { useNavigate, useParams } from "react-router-dom";

function Edit ()  {
  const navigate = useNavigate()
  const { id } = useParams();
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
        <div className="todo-list">
          <div className="font-semibold text-left">
            Edit todo with id {id}:
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                placeholder="Title"
                type="text"
                name="title"
                required
                className="w-full rounded-md px-4 py-2 bg-inherit border mb-6"
                onChange={handleInputChange}
                value={todo?.title}
              />
            </div>
            <div>
              <input
                placeholder="Task"
                type="text"
                name="text"
                required
                className="w-full rounded-md px-4 py-2 bg-inherit border mb-6"
                onChange={handleInputChange}
                value={todo?.text}
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
                onChange={handleInputChange}
                value={todo?.priority}
              />
            </div>
            <div>
              <input
                placeholder="Date"
                type="date"
                name="date"
                required
                className="w-full rounded-md px-4 py-2 bg-inherit border mb-6"
                onChange={handleInputChange}
                value={todo?.date_done}
              />
            </div>
            <button
              className="button"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>

  );
};

export default Edit;
