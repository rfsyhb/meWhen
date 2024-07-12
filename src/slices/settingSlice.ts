import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for the state
interface SettingState {
  mainWebhook: string;
  reminderWebhook: string;
  reminderUserId: string;
  isDiscordEnabled: boolean;
  timerTitle: string;
  timerDuration: number; // in minutes
}

// Initial state
const initialState: SettingState = {
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
    setMainWebhook: (state, action: PayloadAction<string>) => {
      state.mainWebhook = action.payload;
    },
    setReminderWebhook: (state, action: PayloadAction<string>) => {
      state.reminderWebhook = action.payload;
    },
    setReminderUserId: (state, action: PayloadAction<string>) => {
      state.reminderUserId = action.payload;
    },
    setDiscordEnabled: (state, action: PayloadAction<boolean>) => {
      state.isDiscordEnabled = action.payload;
    },
    setTimerTitle: (state, action: PayloadAction<string>) => {
      state.timerTitle = action.payload;
    },
    setTimerDuration: (state, action: PayloadAction<number>) => {
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
