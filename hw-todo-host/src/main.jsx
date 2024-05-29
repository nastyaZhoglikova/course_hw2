import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useAuth } from "./hooks/useAuth";

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance

const router = createRouter({
  routeTree,
  context: { authentication: undefined }
});


// Render the app
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
