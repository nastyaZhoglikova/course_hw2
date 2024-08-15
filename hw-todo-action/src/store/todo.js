import { create } from "zustand";
import supabase from '../utils/supabase.js'

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null
};

export const useTodoStore = create((set, get) => ({
  ...initialState,
  setDefaultState: () => {
    set({ ...initialState });
  },
  addTodo: async (todo) => {
    set({ ...initialState, loading: true });

    const { data, error } = await supabase
      .from("todos")
      .insert({
      ...todo,
      created_at: new Date().toISOString(),
    });

    set({ ...initialState, loading: false, success: !error });

    return !error
  },
  updateTodo: async (todo) => {
    set({ ...initialState, loading: true });
    const { data, error } = await supabase
      .from("todos")
      .update(todo)
      .eq('id', todo.id);

    set({ ...initialState, loading: false, success: !error });
    return !error
  },

  getTodo: async (id) => {
    set({ ...initialState, loading: true });

      const { data, error } = await supabase
        .from("todos")
        .select()
        .eq('id', id);

    set({ loading: false });

    if (error) {
        set({ ...initialState, error: true, errorData: error.message });
        return null
      }
      else return data[0]
  },
}));
