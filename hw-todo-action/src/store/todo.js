import { create } from "zustand";
import axios from "axios";
import supabase from '../utils/supabase.js'
// import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const api = axios.create({ baseURL: BASE_URL });

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null
};

export const useTodoStore = create((set, get) => ({
  ...initialState,

  addTodo: async (todo) => {
    // const navigate = useNavigate();

    const { data, error } = await supabase
      .from("todos")
      .insert({
      ...todo,
      created_at: new Date().toISOString(),
    });

    if (!error) {
// todo: add redirect to todolist


      // navigate("/todo-list");
      console.log(1)
      return 1
    }
  },
}));
