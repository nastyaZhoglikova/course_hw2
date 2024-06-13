import React, { useEffect } from "react";
import {useTodoListStore, useGetData} from "../store/todo-list.js";
import "./List.css";

const List = () => {
  const { list, getAll, orderByPriority, filterByPriority, finished } = useTodoListStore(
    (state) => ({
      list: state.data,
      orderByPriority: state.orderListByPriority,
      filterByPriority: state.filerListByStatus,
      finished: state.finishedTodo,
      getAll: state.execute,
    })
  );

  useEffect(() => {
    getAll();
  }, []);

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
          className="button"
          onClick={() => filterByPriority()}
        >
          Show finished
        </button>
        <button
          className="button"
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
                    onClick={() => finished(item.id)}
                  >
                    Finished
                  </button>
                )
              }
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default List;
