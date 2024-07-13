import {
  createSlice,
  createAsyncThunk,
  AsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import apiRequest from '../services/api';

export interface UserState {
  users: User[];
  user: User | null;
  token: string | null;
  isAuthed: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface User {
  id: string;
  name: string;
  username: string;
  password: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterUserData {
  name: string;
  username: string;
  password: string;
}

// Initial state
const initialState: UserState = {
  users: [],
  user: null,
  token: localStorage.getItem('token'),
  isAuthed: !!localStorage.getItem('token'), // !! converts to boolean
  status: 'idle',
  error: null,
};

// Thunks
export const registerUser: AsyncThunk<User, RegisterUserData, object> =
  createAsyncThunk<User, RegisterUserData>(
    'user/register',
    async (userData) => {
      const response = await apiRequest('post', 'users/register', userData);
      return response.data;
    }
  );

export const loginUser: AsyncThunk<string, LoginCredentials, object> =
  createAsyncThunk<string, LoginCredentials>(
    'user/login',
    async (credentials) => {
      const response = await apiRequest('post', 'users/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    }
  );

export const fetchUsers: AsyncThunk<User[], void, object> = createAsyncThunk<
  User[],
  void
>('user/fetchUsers', async () => {
  const response = await apiRequest('get', 'users');
  return response.data.users;
});

export const getUserProfile: AsyncThunk<User, void, object> = createAsyncThunk<
  User,
  void
>('user/getUserProfile', async (_, thunkAPI) => {
  try {
    const response = await apiRequest('get', 'users/me');
    return response.data.user;
  } catch (err) {
    localStorage.removeItem('token');
    return thunkAPI.rejectWithValue('Token invalid or request failed');
  }
});

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthed = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.token = action.payload;
        state.isAuthed = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(
        getUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = 'succeeded';
          state.user = action.payload;
          state.isAuthed = true;
        }
      )
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.user = null;
        state.isAuthed = false;
        state.error = action.error.message || null;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
