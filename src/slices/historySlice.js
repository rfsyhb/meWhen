import { createSlice } from '@reduxjs/toolkit';
import { getTodayDateKey } from '../utils/helper';

const loadHistory = () => {
  const todayKey = getTodayDateKey();
  const storedHistory = localStorage.getItem(todayKey);
  return storedHistory ? JSON.parse(storedHistory) : [];
};

const saveHistory = (history) => {
  const todayKey = getTodayDateKey();
  localStorage.setItem(todayKey, JSON.stringify(history));
};

const clearHistory = () => {
  const todayKey = getTodayDateKey();
  localStorage.removeItem(todayKey);
};

const initialState = {
  history: loadHistory(),
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    add: (state, action) => {
      state.history.push(action.payload);
      saveHistory(state.history);
    },
    clear: (state) => {
      state.history = [];
      clearHistory();
    },
  },
});

export const { add, clear } = historySlice.actions;
export default historySlice.reducer;
