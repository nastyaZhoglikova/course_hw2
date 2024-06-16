import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.jsx'
import Edit from './routes/edit.jsx'
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>,
)
