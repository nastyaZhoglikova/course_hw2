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
  errorData: null,
  order: 'id',
  filter: 'id'
};

export const useTodoListStore = create((set, get) => ({
  ...initialState,
  deleteTodo: async (todoId) => {
    set({ ...initialState, filter: 'status' });

    try {
      const { data, error } = await supabase
        .from("todos")
        .delete()
        .eq("id", todoId);

      if (!error) get().execute()

      set({ ...initialState, success: true, data });

    } catch (err) {
      console.error("Error in data fetch:", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
  orderListByPriority: async () => {
    set({ ...initialState, order: 'priority' });

    try {
      const { data } = await supabase
        .from('todos')
        .select()
        .order('priority', { ascending: false });

      set({ ...initialState, success: true, data });

    } catch (err) {
      console.error("Error in data fetch:", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
  filerListByStatus: async () => {
    set({ ...initialState, filter: 'status' });

    try {
      const { data } = await supabase
        .from("todos")
        .select()
        .eq('status', true)

      set({ ...initialState, success: true, data });

    } catch (err) {
      console.error("Error in data fetch:", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
  finishedTodo: async (todoId) => {
    set({ ...initialState, filter: 'status' });

    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ status: true })
        .eq("id", todoId);

      if (!error) get().execute()

      set({ ...initialState, success: true, data });

    } catch (err) {
      console.error("Error in data fetch:", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const { data } = await supabase
        .from('todos')
        .select()

      set({ ...initialState, success: true, data });
    } catch (err) {
      console.error("Error in data fetch:", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },

}));
