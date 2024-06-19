import React, { useEffect } from "react";
import { useTodoListStore } from "../store/todo-list.js";
import "./List.css";
import {redirect} from '@tanstack/react-router'

function List () {

  const { list, filter, getAll, orderByPriority, filterByPriority, finishItem, deleteItem } = useTodoListStore(
    (state) => ({
      list: state.data,
      filter: state.filter,
      orderByPriority: state.orderListByPriority,
      filterByPriority: state.filerListByStatus,
      finishItem: state.finishedTodo,
      deleteItem: state.deleteTodo,
      getAll: state.execute,
    })
  );

  useEffect(() => {
    getAll();
  }, []);

  const handleEditTodo = (id) => {
    redirect(`todo-action/${id}`)
  };

  return (
    <div>
      <div className="buttons-card">
        <button
          className="button"
          onClick={() => orderByPriority()}
        >
          Order By Priority
        </button>
        <button
          className={filter !== 'id' ? 'active button' : 'button'}
          onClick={() => filterByPriority()}
        >
          Show finished {filter}
        </button>
        <button
          className={filter === 'id' ? 'active button' : 'button'}
          onClick={() => getAll()}
        >
          Show all
        </button>
      </div>
      <div className="todo-list">

        {(list)?.map((item) => (
          <div key={item.id} className="card style_1">
            <div className="title">{item.title}</div>
            <div className="content text-left">
              <div>Priority {item.priority}/5</div>
              <div>{item.date_done}</div>
              <div>{item.status ? 'Finished' : 'Created'}</div>
              <div>{item.text}</div>
              {
                !item.status && (
                  <button
                    className="button"
                    onClick={() => finishItem(item.id)}
                  >
                    Finished
                  </button>
                )
              }
              <button
                className="button"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
              <button
                className="button"
                onClick={() => handleEditTodo(item.id)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default List;
