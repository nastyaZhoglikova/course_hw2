import Root from './routes/root.jsx';
import Edit from './routes/edit.jsx';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo-action" element={<Root />} />
        <Route path="/todo-action/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
