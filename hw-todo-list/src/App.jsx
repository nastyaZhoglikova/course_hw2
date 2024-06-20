import { MemoryRouter, Routes, Route } from "react-router-dom";
import TodoList from './TodoList.jsx'
import React, { createContext } from "react";

export const NavigationContext = createContext(undefined);

const App = ({ onNavigate }) => {
  return (
    <MemoryRouter>
      <NavigationContext.Provider value={{ onNavigate }}>
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
      </NavigationContext.Provider>
    </MemoryRouter>
  );
};

export default App;
