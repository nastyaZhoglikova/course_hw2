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
  addTodo: async (todo) => {
    const { todoList } = get();
    try {
      // const { data, error } = await supabase.from("todos").insert({
      //   ...todoItem,
      //   created_at: new Date().toISOString(),
      // });

      // Make a POST request to the API endpoint to add the movie to the watchlist
      const response = await api.post(
        "todos",
        { todo },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          },
        }
      );

      // If the API request is successful, update the local watchlist state
      if (response.status === 201) {
        set({ watchlist: [...watchlist, movie] });
      } else {
        // Handle the error case
        console.error("Failed to add movie to watchlist:", response.data);
      }
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
    }
  },
  deleteTodo: async (movieId) => {
    try {
      // Make a DELETE request to the API endpoint to remove the movie from the watchlist
      const response = await api.post(
        "account/21271511/watchlist",
        { media_type: "movie", media_id: movieId, watchlist: false },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          },
        }
      );

      // If the API request is successful, update the local watchlist state
      if (response.status === 200) {
        set((state) => ({
          watchlist: state.watchlist.filter((movie) => movie.id !== movieId),
        }));
      } else {
        // Handle the error case
        console.error("Failed to remove movie from watchlist:", response.data);
      }
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
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

  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const orderType = get().order

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

export const useGetData = create((set, get) => ({
  ...initialState,

  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const orderType = get().order
      console.log(orderType)
      const { data } = await supabase
        .from('todos')
        .select()
        .order(orderType, { ascending: true });

      set({ ...initialState, success: true, data });
    } catch (err) {
      console.error("Error in data fetch:", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
