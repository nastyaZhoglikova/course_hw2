import { create } from "zustand";
import supabase from '../utils/supabase.js'

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
    const { data, error } = await supabase
      .from("todos")
      .insert({
      ...todo,
      created_at: new Date().toISOString(),
    });

    return !error
  },
  updateTodo: async (todo) => {
    const { data, error } = await supabase
      .from("todos")
      .update(todo)
      .eq('id', todo.id);

    return !error
  },

  getTodo: async (id) => {
    console.log(2222, id)
    set({ ...initialState, loading: true });

      const { data, error } = await supabase
        .from("todos")
        .select()
        .eq('id', id);

      if (error) {
        set({ ...initialState, error: true, errorData: error.message });
        return null
      }
      else return data[0]

  },
}));
