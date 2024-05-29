// todolist.jsx
import { createLazyFileRoute } from "@tanstack/react-router";
import React from "react";

const TodoListLazy = React.lazy(() => import("todolist/TodoList"));

export const TodoList = () => {
  return (
    <div className="movies-container">
      <TodoListLazy />
    </div>
  );
};

export const Route = createLazyFileRoute("/todolist")({
  component: TodoList,
});
