import { create } from "zustand";
import axios from "axios";
import supabase from '../utils/supabase.js'

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
    // const title = formData.get("title");
    // const text = formData.get("text");
    // const priority = formData.get("priority");
    // const date_done = formData.get("date");

    // if (!title && !text) {
    //   return;
    // }

    // const todoItem = {
    //   title,
    //   text,
    //   priority,
    //   date_done,
    //   status: false
    // }
    // console.log(todo)

    const { data, error } = await supabase
      .from("todos")
      .insert({
      ...todo,
      created_at: new Date().toISOString(),
    });

    if (!error) {
// todo: add redirect to todolist
      console.log(1)
    }
  },
}));
