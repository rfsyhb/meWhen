import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import todoReducer from '../slices/todoSlice';
import timerReducer from '../slices/timerSlice';
import settingReducer from '../slices/settingSlice';
import historyReducer from '../slices/historySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
    timer: timerReducer,
    setting: settingReducer,
    history: historyReducer,
  },
});

export default store;
