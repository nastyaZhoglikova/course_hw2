import {createLazyFileRoute, redirect} from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  beforeLoad: ({ context }) => {
    const { isLogged } = context.authentication;

    if(!isLogged()) {
      throw redirect({
        to: '/todo-auth'
      })
    }
  },
  component: Index,
});

function Index() {
  return (
    <div className="index-container">
      <h3>Welcome Home!</h3>
    </div>
  )
}
