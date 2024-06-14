import {useEffect, useState} from "react";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import supabase from '../utils/supabase.js'
import './App.css'

function App() {
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
    return (<Auth supabaseClient={supabase} appearance={{theme: ThemeSupa}}/>)
  } else {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <>
          <h3>Hello user!</h3>
          <button
            onClick={async () => {
              const {error} = await supabase.auth.signOut();
              router.invalidate();
            }}
          >
            Sign out
          </button>
        </>
      </div>
    )
  }

}

export default App
