import {createLazyFileRoute, redirect, useNavigate} from '@tanstack/react-router'
import React from "react";

const TodoListLazy = React.lazy(() => import("list/TodoList"));

const TodoList = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <TodoListLazy
        onNavigate={(to, search) =>

          navigate({
            to, search
          })
        }
      />
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
