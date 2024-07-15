import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import NavigationButtons from './common/NavigationButtons';
import { useEffect, useRef } from 'react';
import { getUserProfile } from '../slices/userSlice';
import { fetchUserTodos } from '../slices/todoSlice';
import {
  start,
  stop,
  reset,
  startReminding,
  stopReminding,
  tick,
} from '../slices/timerSlice';
import useTodayDate from '../hooks/useTodayDate';
import useTimeNow from '../hooks/useTimeNow';
import { add } from '../slices/historySlice';
import axios from 'axios';
import UserProfileSection from './common/UserProfileSection';
import TimerDisplay from './common/TimerDisplay';
import TodoList from './common/TodoList';

export default function Timer() {
  const dispatch = useDispatch<AppDispatch>();
  const time = useSelector((state: RootState) => state.timer.time);
  const isRunning = useSelector((state: RootState) => state.timer.isRunning);
  const setting = useSelector((state: RootState) => state.setting);
  const { todayDate } = useTodayDate(); // Custom hook
  const { timeNow } = useTimeNow(); // Custom hook
  const location = useLocation(); // React Router hook
  const workerRef = useRef<Worker | null>(null);

  // Fetch user profile when token is present and fetch todos if user is authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const resultAction = await dispatch(getUserProfile());
        if (getUserProfile.fulfilled.match(resultAction)) {
          dispatch(fetchUserTodos());
        }
      }
    };
    fetchUserData();
  }, [dispatch]);

  // Timer worker
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../utils/timerWorker.ts', import.meta.url)
    );

    workerRef.current.onmessage = (event) => {
      if (event.data === 'tick') {
        dispatch(tick());
      } else if (event.data.type === 'reset') {
        dispatch(reset(event.data.duration));
      } else if (
        event.data.type === 'sendReminder' &&
        event.data.reminderWebhook
      ) {
        console.log('Handling sendReminder in Timer component...');
        axios
          .post(event.data.reminderWebhook, {
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
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [dispatch, setting.reminderUserId]);

  useEffect(() => {
    if (isRunning) {
      workerRef.current?.postMessage({ type: 'start' });
    } else {
      workerRef.current?.postMessage({ type: 'stop' });
    }
  }, [isRunning]);

  useEffect(() => {
    if (time === 0 && isRunning) {
      const historyData = {
        title: setting.timerTitle,
        time: setting.timerDuration,
      };
      dispatch(add(historyData));
      dispatch(stop());

      // Post to Discord if enabled
      if (setting.isDiscordEnabled && setting.mainWebhook) {
        axios
          .post(setting.mainWebhook, {
            content: `[${timeNow}] [${todayDate}], "${historyData.title}" - ${historyData.time} min, finished.`,
          })
          .then(() => {
            console.log('Discord message sent!');
          })
          .catch((err) => {
            console.error('Error postng to Discord:', err);
          });
      }

      if (
        setting.reminderWebhook.length > 1 &&
        setting.reminderUserId.length > 1
      ) {
        console.log('Dispatching startReminding...');
        dispatch(startReminding());
        workerRef.current?.postMessage({
          type: 'startReminder',
          isReminding: true,
          reminderWebhook: setting.reminderWebhook,
        });
      }
    }
  }, [time, isRunning, dispatch, setting, timeNow, todayDate]);

  // Reset timer when timer duration changes
  useEffect(() => {
    if (!isRunning) {
      dispatch(reset(setting.timerDuration * 60));
    }
  }, [dispatch, isRunning, setting.timerDuration]);

  const handleStart = () => {
    if (setting.timerTitle.length > 1) {
      dispatch(reset(setting.timerDuration * 60));
      dispatch(start());
    } else {
      alert('u forgor to add title ser!');
    }
  };

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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto min-h-[15rem] justify-center items-center gap-2 p-4">
      <div className="flex flex-col sm:flex-row w-full justify-between px-6 gap-4 sm:gap-0">
        <UserProfileSection />
        <NavigationButtons location={location.pathname} />
      </div>
      <div className="flex flex-col md:flex-row w-full h-auto md:h-48 justify-center gap-4">
        <div className="flex flex-col md:flex-row w-full md:w-[50%] justify-center items-center rounded-xl gap-3 bg-cardMain shadow-md p-8">
          <TimerDisplay
            formatTime={formatTime}
            handleStopReminder={handleStopReminder}
          />
          <div className="flex md:flex-col gap-2">
            <button
              className={`font-semibold px-4 py-1 rounded-md border border-black hover:bg-text hover:text-white hover:border-black ${isRunning ? 'bg-black text-white cursor-not-allowed' : 'bg-white text-black'}`}
              onClick={handleStart}
              disabled={isRunning}
            >
              Start
            </button>
            <button
              className="font-semibold px-4 py-1 bg-white rounded-md border border-black hover:text-white hover:border-black hover:bg-red-400"
              onClick={handleReset}
              disabled={!isRunning}
            >
              Reset
            </button>
          </div>
        </div>
        <TodoList />
      </div>
    </div>
  );
}
