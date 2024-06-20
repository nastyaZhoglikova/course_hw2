import Root from './routes/root.jsx';
import {
  MemoryRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import './App.css';


function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/"  element={<Root />} />
      </Routes>
    </MemoryRouter>
  )
}

export default App;
