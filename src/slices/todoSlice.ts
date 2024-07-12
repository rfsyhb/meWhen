import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
} from '@reduxjs/toolkit';
import apiRequest from '../services/api';

interface Todo {
  id: string;
  ownerId: string;
  title: string;
  completed: boolean;
}

interface CreateTodoData {
  title: string;
}

interface UpdateTodoData {
  id: string;
  todo: Partial<Todo>;
}

export interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: TodosState = {
  todos: [],
  status: 'idle',
  error: null,
};

// Thunks
export const fetchUserTodos: AsyncThunk<Todo[], void, object> =
  createAsyncThunk<Todo[], void>('todos/fetchUserTodos', async () => {
    const response = await apiRequest('get', 'todos');
    return response.data.todos;
  });

export const createTodo: AsyncThunk<Todo, CreateTodoData, object> =
  createAsyncThunk<Todo, CreateTodoData>(
    'todos/createTodo',
    async (todo, { dispatch }) => {
      const response = await apiRequest('post', 'todos/create', todo);
      dispatch(fetchUserTodos());
      return response.data.newTodo;
    }
  );

export const updateTodo: AsyncThunk<Todo, UpdateTodoData, object> =
  createAsyncThunk<Todo, UpdateTodoData>(
    'todos/updateTodo',
    async ({ id, todo }, { dispatch }) => {
      const response = await apiRequest('put', `todos/update/${id}`, todo);
      dispatch(fetchUserTodos());
      return response.data.updatedTodo;
    }
  );

export const deleteTodo: AsyncThunk<string, string, object> = createAsyncThunk<
  string,
  string
>('todos/deleteTodo', async (id, { dispatch }) => {
  await apiRequest('delete', `todos/delete/${id}`);
  dispatch(fetchUserTodos());
  return id; // Return the deleted todo id for removal from state
});

// Slice
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchUserTodos.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.status = 'succeeded';
          state.todos = action.payload;
        }
      )
      .addCase(fetchUserTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = 'succeeded';
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = 'succeeded';
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
