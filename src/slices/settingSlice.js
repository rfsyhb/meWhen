import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainWebhook: '',
  reminderWebhook: '',
  reminderUserId: '',
  isDiscordEnabled: false,
  timerTitle: '',
  timerDuration: 25, // 25 minutes
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setMainWebhook: (state, action) => {
      state.mainWebhook = action.payload;
    },
    setReminderWebhook: (state, action) => {
      state.reminderWebhook = action.payload;
    },
    setReminderUserId: (state, action) => {
      state.reminderUserId = action.payload;
    },
    setDiscordEnabled: (state, action) => {
      state.isDiscordEnabled = action.payload;
    },
    setTimerTitle: (state, action) => {
      state.timerTitle = action.payload;
    },
    setTimerDuration: (state, action) => {
      state.timerDuration = action.payload;
    },
  },
});

export const {
  setMainWebhook,
  setReminderWebhook,
  setReminderUserId,
  setDiscordEnabled,
  setTimerTitle,
  setTimerDuration,
} = settingSlice.actions;
export default settingSlice.reducer;
