import {createLazyFileRoute, redirect} from '@tanstack/react-router'
import React from "react";

const TodoListLazy = React.lazy(() => import("list/TodoList"));

const TodoList = () => {
  return (
    <div className="movies-container">
      <TodoListLazy />
    </div>
  );
};

export const Route = createLazyFileRoute("/todo-list")({
  beforeLoad: ({ context }) => {
    const { isLogged } = context.authentication;
    if(!isLogged()) {
      throw redirect({
        to: '/todo-auth'
      })
    }
  },
  component: TodoList,
});
