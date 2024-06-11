import {createLazyFileRoute, redirect} from '@tanstack/react-router'
import React from "react";

const TodoActionLazy = React.lazy(() => import("action/TodoAction"));

const TodoAction = () => {
  return (
    <div className="movies-container">
      <TodoActionLazy />
    </div>
  );
};

export const Route = createLazyFileRoute("/todo-action")({
  beforeLoad: ({ context }) => {
    const { isLogged } = context.authentication;
    if(!isLogged()) {
      throw redirect({
        to: '/todo-auth'
      })
    }
  },
  component: TodoAction,
});
