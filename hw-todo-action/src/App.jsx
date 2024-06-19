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
    <BrowserRouter basename="/todo-action">
      <Routes>
        <Route path="/edit/:id*" element={<Edit />} />
        <Route path="/create" element={<Root />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
