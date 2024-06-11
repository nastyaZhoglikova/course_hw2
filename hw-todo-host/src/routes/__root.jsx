import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';
import '../index.css';
import {useEffect, useState} from "react";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import supabase from '../utils/supabase.js'


export const Route = createRootRoute({
    component: () => {
        const [session, setSession] = useState(null)

      console.log(11111)
      console.log(session)
      // const supabase = createClient(, );


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
            return (<Auth supabaseClient={supabase} appearance={{theme: ThemeSupa}}/>)
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
