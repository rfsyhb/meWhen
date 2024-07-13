import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TimerState {
  time: number;
  isRunning: boolean;
  isReminding: boolean;
}

const initialState: TimerState = {
  time: 1500, // 25 minutes, default
  isRunning: false,
  isReminding: false, // Whether the timer is reminding the user
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    start: (state) => {
      state.isRunning = true;
    },
    stop: (state) => {
      state.isRunning = false;
    },
    reset: (state, action: PayloadAction<number | undefined>) => {
      state.time = action.payload || 1500;
      state.isRunning = false;
    },
    startReminding: (state) => {
      state.isReminding = true;
    },
    stopReminding: (state) => {
      state.isReminding = false;
    },
    tick: (state) => {
      state.time -= 1; // Decrement time by 1 second
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
  },
});

export const {
  start,
  stop,
  reset,
  startReminding,
  stopReminding,
  tick,
  setTime,
} = timerSlice.actions;
export default timerSlice.reducer;
