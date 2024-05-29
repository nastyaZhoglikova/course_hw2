// todoaction.jsx
import { createLazyFileRoute } from "@tanstack/react-router";
import React from "react";

const TodoActionLazy = React.lazy(() => import("todoaction/TodoAction"));

export const TodoAction = () => {
  return (
    <div className="movies-container">
      <TodoActionLazy />
    </div>
  );
};

export const Route = createLazyFileRoute("/todoaction")({
  component: TodoAction,
});
