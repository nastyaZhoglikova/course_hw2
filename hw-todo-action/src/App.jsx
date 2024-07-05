import Root from './routes/root.jsx';
import React from "react";
import {
  MemoryRouter,
  Route,
  Routes } from "react-router-dom";
import './index.css';
import './App.css';
export default () => (
  <MemoryRouter>
    <Routes>
      <Route exact path="/" element={<Root />} />
    </Routes>
  </MemoryRouter>
);
