import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../services/api';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData) => {
    const response = await apiRequest('post', 'users/register', userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk('user/login', async (credentials) => {
  const response = await apiRequest('post', 'users/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data.token;
});

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await apiRequest('get', 'users');
  return response.data.users;
});

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (id) => {
    const response = await apiRequest('get', `users/${id}`);
    return response.data.user;
  }
);

const initialState = {
  users: [],
  user: {},
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
