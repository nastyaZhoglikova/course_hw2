import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useAuth } from "./hooks/useAuth";

import { routeTree } from './routeTree.gen'


const router = createRouter({
  routeTree,
  context: { authentication: undefined }
});

const rootElement = document.getElementById('root')
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  const authentication = useAuth()

  root.render(
    <StrictMode>
      <RouterProvider router={router} context={{ authentication }} />
    </StrictMode>,
  )
}
