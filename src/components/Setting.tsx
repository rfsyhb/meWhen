import NavigationButtons from './NavigationButtons';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { useSelector } from 'react-redux';
import {
  setMainWebhook,
  setReminderWebhook,
  setReminderUserId,
  setDiscordEnabled,
  setTimerTitle,
  setTimerDuration,
} from '../slices/settingSlice.ts';

export default function Setting() {
  const dispatch = useDispatch<AppDispatch>();
  const setting = useSelector((state: RootState) => state.setting);

  const handleMainwebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMainWebhook(e.target.value));
  };

  const handleReminderWebhookChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setReminderWebhook(e.target.value));
  };

  const handleReminderUserIdChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setReminderUserId(e.target.value));
  };

  const handleDiscordEnabledChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setDiscordEnabled(e.target.checked));
  };

  const handleTimerTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTimerTitle(e.target.value));
  };

  const handleTimerDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (value > -1 && value <= 60) {
      dispatch(setTimerDuration(value));
    }
  };

  const location = useLocation();

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto min-h-[15rem] justify-center items-center gap-2 p-4">
      <NavigationButtons location={location.pathname} />
      <div className="w-full">
        <div className="flex flex-col gap-4 bg-cardMain p-6 rounded-xl border border-black border-opacity-20">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between">
            <div className="flex flex-row">
              <h1 className="font-semibold text-2xl">meWhenTracker</h1>
              <p className="text-sm">
                <a
                  href="https://github.com/rfsyhb"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="text-blue-500">by limau</span>
                </a>
              </p>
            </div>
            <div className="flex md:flex-col flex-row text-right gap-2">
              <label
                htmlFor="enableDiscord"
                className="font-semibold flex items-center gap-4 px-2 self-end border border-black border-opacity-30 rounded-lg justify-between"
              >
                Discord
                <div className="relative">
                  <input
                    id="enableDiscord"
                    type="checkbox"
                    checked={setting.isDiscordEnabled}
                    onChange={handleDiscordEnabledChange}
                    className="sr-only"
                  />
                  <div
                    className={`block w-8 h-4 rounded-full ${setting.isDiscordEnabled ? 'bg-black' : 'bg-gray-400'}`}
                  />
                  <div
                    className={`dot absolute left-0 top-0 bg-white w-4 h-4 border border-gray-400 rounded-full transition ${
                      setting.isDiscordEnabled ? 'transform translate-x-4' : ''
                    }`}
                  />
                </div>
              </label>
              <div className="flex flex-row gap-2">
                <label htmlFor="webhook">
                  <input
                    id="webhook"
                    type="text"
                    value={setting.mainWebhook}
                    onChange={handleMainwebhookChange}
                    className="rounded-md px-2 w-16"
                    placeholder="main"
                    disabled={!setting.isDiscordEnabled}
                  />
                </label>
                <label htmlFor="webhookReminder">
                  <input
                    id="webhookReminder"
                    type="text"
                    value={setting.reminderWebhook}
                    onChange={handleReminderWebhookChange}
                    className="rounded-md px-2 w-16"
                    placeholder="spam"
                    disabled={!setting.isDiscordEnabled}
                  />
                </label>
                <label htmlFor="usernameReminder">
                  <input
                    id="usernameReminder"
                    type="text"
                    value={setting.reminderUserId}
                    onChange={handleReminderUserIdChange}
                    className="rounded-md px-2 w-16"
                    placeholder="UID"
                    disabled={!setting.isDiscordEnabled}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <label htmlFor="title" className="w-full sm:w-[80%] flex flex-col">
              <span className="text-sm pl-2">title?</span>
              <input
                id="title"
                type="text"
                value={setting.timerTitle}
                onChange={handleTimerTitleChange}
                className="rounded-md px-2"
                placeholder="berak"
                maxLength={25}
              />
            </label>
            <label
              htmlFor="duration"
              className="w-full sm:w-[20%] flex flex-col"
            >
              <span className="text-sm pl-2">how long?</span>
              <input
                id="duration"
                type="number"
                value={setting.timerDuration}
                onChange={handleTimerDurationChange}
                className="rounded-md px-2"
                min={0}
                max={600}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
