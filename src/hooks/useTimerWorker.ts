import { useDispatch } from 'react-redux';
import { SettingState } from '../slices/settingSlice';
import { AppDispatch, RootState } from '../app/store';
import { useEffect, useRef } from 'react';
import {
  reset,
  startReminding,
  stop,
  stopReminding,
  tick,
} from '../slices/timerSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { add } from '../slices/historySlice';
import useTimeNow from './useTimeNow';
import useTodayDate from './useTodayDate';
import { WorkerResponse } from '../utils/timerWorker';

const useTimerWorker = (setting: SettingState) => {
  const isRunning = useSelector((state: RootState) => state.timer.isRunning);
  const time = useSelector((state: RootState) => state.timer.time);
  const dispatch = useDispatch<AppDispatch>();
  const workerRef = useRef<Worker | null>(null);
  const { timeNow } = useTimeNow();
  const { todayDate } = useTodayDate();

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../utils/timerWorker.ts', import.meta.url)
    );

    // Handle messages from worker
    workerRef.current.onmessage = (
      event: MessageEvent<WorkerResponse | 'tick'>
    ) => {
      if (event.data === 'tick') {
        dispatch(tick());
      } else {
        const { type, duration, reminderWebhook } = event.data;
        if (type === 'reset' && duration !== undefined) {
          dispatch(reset(duration));
        } else if (type === 'sendReminder' && reminderWebhook) {
          axios
            .post(reminderWebhook, {
              content: `<@${setting.reminderUserId}> tolong tekan done!`,
              allowed_mentions: {
                users: [setting.reminderUserId],
              },
            })
            .then(() => {
              console.log('Reminder sent!');
            })
            .catch((err) => {
              console.error('Error posting reminder:', err);
            });
        }
      }

      // Cleanup
      return () => {
        workerRef.current?.terminate();
      };
    };
  }, [dispatch, setting.reminderUserId]);

  // Start or stop the timer each time isRunning changes
  useEffect(() => {
    if (isRunning) {
      workerRef.current?.postMessage({ type: 'start' });
    } else {
      workerRef.current?.postMessage({ type: 'stop' });
    }
  }, [isRunning]);

  // Handle timer completion
  useEffect(() => {
    if (time === 0 && isRunning) {
      const historyData = {
        title: setting.timerTitle,
        time: setting.timerDuration,
      };
      dispatch(add(historyData));
      dispatch(stop());

      if (setting.isDiscordEnabled && setting.mainWebhook) {
        axios
          .post(setting.mainWebhook, {
            content: `[${timeNow}] [${todayDate}], "${historyData.title}" - ${historyData.time} min, finished.`,
          })
          .then(() => {
            console.log('Discord message sent!');
          })
          .catch((err) => {
            console.error('Error posting to Discord:', err);
          });
      }

      if (
        setting.reminderWebhook.length > 1 &&
        setting.reminderUserId.length > 1
      ) {
        dispatch(startReminding());
        workerRef.current?.postMessage({
          type: 'startReminder',
          isReminding: true,
          reminderWebhook: setting.reminderWebhook,
        });
      }
    }
  }, [time, isRunning, dispatch, setting, timeNow, todayDate]);

  // Reset timer when timer duration changes and timer is not running
  useEffect(() => {
    if (!isRunning) {
      dispatch(reset(setting.timerDuration * 60));
    }
  }, [setting.timerDuration, isRunning, dispatch]);

  const handleReset = () => {
    dispatch(reset(setting.timerDuration * 60));
    workerRef.current?.postMessage({
      type: 'reset',
      duration: setting.timerDuration,
    });
  };

  const handleStopReminder = () => {
    dispatch(stopReminding());
    workerRef.current?.postMessage({ type: 'stopReminder' });
  };

  return { handleReset, handleStopReminder };
};

export default useTimerWorker;
