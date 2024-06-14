import {createLazyFileRoute, redirect} from '@tanstack/react-router'
import React from "react";

const TodoAuthLazy = React.lazy(() => import("auth/TodoAuth"));

const TodoAuth = () => {
  return (
    <div className="movies-container">
      <TodoAuthLazy />
    </div>
  );
};

export const Route = createLazyFileRoute("/todo-auth")({
  component: TodoAuth,
});
