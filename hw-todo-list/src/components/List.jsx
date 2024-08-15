import React, { useEffect, useContext } from "react";
import { useTodoListStore } from "../store/todo-list.js";
import "./List.css";
import { NavigationContext } from '../App.jsx'

function List () {
  const onNavigateContext = useContext(NavigationContext);
  const { list, filter, order, getAll, orderByPriority, filterByStatus, finishItem, deleteItem } = useTodoListStore(
    (state) => ({
      list: state.data,
      order: state.order,
      filter: state.filter,
      orderByPriority: state.orderListByPriority,
      filterByStatus: state.filerListByStatus,
      finishItem: state.finishedTodo,
      deleteItem: state.deleteTodo,
      getAll: state.execute,
    })
  );

  useEffect(() => {
    getAll();
  }, []);

  const handleEditTodo = (id) => {
    // Тут має бути нормальне присвоювання параметрів через .search({id}) чи шось схоже, але в мене не вийшло
    onNavigateContext?.onNavigate(`/todo-action?id=${id}`)
  };

  return (
    <div>
      <div className="buttons-card">
        <div>All todo: {list?.length}</div>
        <div>Finished todo: {list?.filter(i => i.status).length}</div>
        <button
          className={order === 'priority' ? 'active button' : 'button'}
          onClick={() => orderByPriority()}
        >
          Order By Priority
        </button>
        <button
          className={filter === 'status' ? 'active button' : 'button'}
          onClick={() => filterByStatus()}
        >
          Show finished
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
