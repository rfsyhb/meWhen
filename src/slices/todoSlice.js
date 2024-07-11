import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../services/api';
/**
 * /todos
 * /todos/create
 * /todos/update/{id}
 * /todos/delete/{id}
 */

export const fetchUserTodos = createAsyncThunk(
  'todos/fetchUserTodos',
  async () => {
    const response = await apiRequest('get', 'todos');
    return response.data.todos;
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todo, { dispatch }) => {
    const response = await apiRequest('post', 'todos/create', todo);
    dispatch(fetchUserTodos());
    return response.data.newTodo;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, todo }, { dispatch }) => {
    const response = await apiRequest('put', `todos/update/${id}`, todo);
    dispatch(fetchUserTodos());
    return response.data.updatedTodo;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { dispatch }) => {
    await apiRequest('delete', `todos/delete/${id}`);
    dispatch(fetchUserTodos());
    return id; // Return the deleted todo id for removal from state
  }
);

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchUserTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
