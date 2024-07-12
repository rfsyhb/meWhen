import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTodayDateKey } from '../utils/helper';

// Define the interface for a history entry
interface HistoryEntry {
  title: string;
  time: string;
}

// Define the interface for the state
interface HistoryState {
  history: HistoryEntry[]; // array of history entries
}

// Functions to load, save, and clear history from localStorage
const loadHistoryFromLocalStorage = (): HistoryEntry[] => {
  const todayKey = getTodayDateKey();
  const storedHistory = localStorage.getItem(todayKey);
  return storedHistory ? JSON.parse(storedHistory) : [];
};

const saveHistory = (history: HistoryEntry[]): void => {
  const todayKey = getTodayDateKey();
  localStorage.setItem(todayKey, JSON.stringify(history));
};

const clearHistory = (): void => {
  const todayKey = getTodayDateKey();
  localStorage.removeItem(todayKey);
};

// Initial state
const initialState: HistoryState = {
  history: loadHistoryFromLocalStorage(),
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<HistoryEntry>) => {
      state.history.push(action.payload);
      saveHistory(state.history);
    },
    clear: (state) => {
      state.history = [];
      clearHistory();
    },
    loadHistory: (state) => {
      state.history = loadHistoryFromLocalStorage();
    },
  },
});

export const { add, clear, loadHistory } = historySlice.actions;
export default historySlice.reducer;
