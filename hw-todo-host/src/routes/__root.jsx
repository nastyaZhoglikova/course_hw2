import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';
import '../index.css';
import React, {useEffect, useState} from "react";
import supabase from '../utils/supabase.js'


const AuthLazy = React.lazy(() => import("auth/TodoAuth"));

const TodoAuth = () => {
  return (
    <div className="page-container">
      <AuthLazy />
    </div>
  );
};

export const Route = createRootRoute({
    component: () => {
      const [session, setSession] = useState(null)

      useEffect(() => {
            supabase.auth.getSession().then(({data: {session}}) => {
                setSession(session)
            })

            const {
                data: {subscription},
            } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session)
            })

            return () => subscription.unsubscribe()
      }, [])

        if (!session) {
            return (<TodoAuth/>)
        } else {
            return (
                <>
                    <div className="nav-container">
                        <Link to="/" className="[&.active]:font-bold">
                            Home
                        </Link>
                        <Link to="/todo-list" className="[&.active]:font-bold">
                            Todo List
                        </Link>
                        <Link to="/todo-action" className="[&.active]:font-bold">
                            Todo Action
                        </Link>
                        <Link to="/todo-auth" className="[&.active]:font-bold">
                            Login
                        </Link>
                    </div>
                    <Outlet/>
                    <TanStackRouterDevtools/>
                </>
            );
        }
    }
});
