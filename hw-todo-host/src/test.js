import { createFileRoute } from '@tanstack/react-router'

import { Route as rootRoute } from './routes/__root.jsx'
// import { Route as LoginImport } from './routes/login'
import { Route as AuthenticatedImport } from './routes/_authenticated'

const TodoListLazyImport = createFileRoute('/todolist')()
const TodoActionLazyImport = createFileRoute('/todoaction')()
const TodoAuthLazyImport = createFileRoute('/todoauth')()
const IndexLazyImport = createFileRoute('/')()

const TodoListLazyRoute = TodoListLazyImport.update({
  path: '/todolist',
  getParentRoute: () => rootRoute,
}).lazy(() => import('./routes/todo-list.lazy').then((d) => d.Route))

const TodoActionLazyRoute = TodoActionLazyImport.update({
  path: '/todoaction',
  getParentRoute: () => rootRoute,
}).lazy(() => import('./routes/todo-action.lazy').then((d) => d.Route))

const TodoAuthLazyRoute = TodoAuthLazyImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
}).lazy(() => import('./routes/todo-auth.lazy').then((d) => d.Route))

// const LoginRoute = LoginImport.update({
//   path: '/login',
//   getParentRoute: () => rootRoute,
// })

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
})

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
}).lazy(() => import('./routes/index.lazy').then((d) => d.Route))


export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  TodoListLazyRoute,
  TodoActionLazyRoute,
  TodoAuthLazyRoute,
  AuthenticatedRoute
})
