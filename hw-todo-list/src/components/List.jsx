import React, { useEffect } from "react";
import {useTodoListStore, useGetData} from "../store/todo-list.js";
import "./List.css";
// import { useLocation, Link } from 'react-router-dom'


const List = () => {
  const { list, getAll, orderByPriority } = useTodoListStore(
    (state) => ({
      list: state.data,
      orderByPriority: state.orderList,
      getAll: state.execute,
    })
  );

  useEffect(() => {
    getAll();
  }, []);

  console.log(list)

  return (
    <div>
      <div className="todo-list">
        <button
          onClick={() => orderByPriority()}
        >
          Order By Priority
        </button>


        {(list)?.map((item) => (
          <div key={item.id} className="card style_1">
            <div className="content">
              <h2>{item.title}</h2>
              <div>{item.priority}</div>
              <div>{item.date_done}</div>
              <div>{item.status}</div>

              {/*<button*/}
              {/*  onClick={() =>*/}
              {/*    isInWatchlist(movie.id)*/}
              {/*      ? removeFromWatchlist(movie.id)*/}
              {/*      : addToWatchlist(movie)*/}
              {/*  }*/}
              {/*>*/}
              {/*  {isInWatchlist(movie.id) ? "Remove" : "Add to Watchlist"}*/}
              {/*</button>*/}
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default List;
