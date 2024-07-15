import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import NavigationButtons from './common/NavigationButtons';
import { useEffect } from 'react';
import { getUserProfile } from '../slices/userSlice';
import { fetchUserTodos } from '../slices/todoSlice';
import { start, reset } from '../slices/timerSlice';
import UserProfileSection from './common/UserProfileSection';
import TimerDisplay from './common/TimerDisplay';
import TodoList from './common/TodoList';
import useTimerWorker from '../hooks/useTimerWorker';

export default function Timer() {
  const dispatch = useDispatch<AppDispatch>();
  const isRunning = useSelector((state: RootState) => state.timer.isRunning);
  const setting = useSelector((state: RootState) => state.setting);
  const location = useLocation(); // React Router hook
  const { handleReset, handleStopReminder } = useTimerWorker(setting); // Custom hook

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

  const handleStart = () => {
    if (setting.timerTitle.length > 1) {
      dispatch(reset(setting.timerDuration * 60));
      dispatch(start());
    } else {
      alert('u forgor to add title ser!');
    }
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
