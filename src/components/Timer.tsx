import { FaRegFrownOpen } from 'react-icons/fa';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import NavigationButtons from './NavigationButtons';
import { useEffect, useRef, useState } from 'react';
import { getUserProfile, logout } from '../slices/userSlice';
import {
  createTodo,
  deleteTodo,
  fetchUserTodos,
  updateTodo,
} from '../slices/todoSlice';
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

export default function Timer() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const todos = useSelector((state: RootState) => state.todo.todos);
  const isAuthed = useSelector((state: RootState) => state.user.isAuthed);
  const time = useSelector((state: RootState) => state.timer.time);
  const isRunning = useSelector((state: RootState) => state.timer.isRunning);
  const setting = useSelector((state: RootState) => state.setting);
  const isReminding = useSelector(
    (state: RootState) => state.timer.isReminding
  );
  const [isAddTodo, setIsAddTodo] = useState(false);
  const [NewTodo, setNewTodo] = useState('');
  const { todayDate } = useTodayDate(); // Custom hook
  const { timeNow } = useTimeNow(); // Custom hook
  const location = useLocation(); // React Router hook
  const workerRef = useRef<Worker | null>(null);

  // Fetch user profile when token is present
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch]);

  // Fetch user todos when user is authenticated
  useEffect(() => {
    if (isAuthed) {
      dispatch(fetchUserTodos());
    }
  }, [dispatch, isAuthed]);

  const logoutHandler = () => {
    dispatch(logout());
  };

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

  const createTodoHandler = async () => {
    await dispatch(createTodo({ title: NewTodo }));
    setIsAddTodo(false);
    setNewTodo('');
  };

  const deleteTodoHandler = async (id: string) => {
    await dispatch(deleteTodo(id));
  };

  const toggleTodoCompletionHandler = async (
    id: string,
    completed: boolean
  ) => {
    await dispatch(
      updateTodo({
        id,
        todo: { completed: !completed },
      })
    );
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto min-h-[15rem] justify-center items-center gap-2 p-4">
      <div className="flex flex-col sm:flex-row w-full justify-between px-6 gap-4 sm:gap-0">
        <div className="flex flex-row items-center gap-2">
          {isAuthed && user ? (
            <>
              <p className="text-xl font-semibold">Hello {user.name}</p>
              <button
                type="button"
                className="text-blue-700 hover:font-semibold"
                onClick={logoutHandler}
              >
                logout?
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-700">
                <span className="text-lg hover:font-semibold">login?</span>
              </Link>
              <Link to="/register" className="text-blue-700">
                <span className="text-lg hover:font-semibold">register?</span>
              </Link>
            </>
          )}
        </div>
        <NavigationButtons location={location.pathname} />
      </div>
      <div className="flex flex-col md:flex-row w-full h-auto md:h-48 justify-center gap-4">
        <div className="flex flex-col md:flex-row w-full md:w-[50%] justify-center items-center rounded-xl gap-3 bg-cardMain shadow-md p-8">
          <div className="flex flex-col flex-grow items-center">
            <p
              className={`${!isReminding ? '' : 'hidden'} text-6xl md:text-8xl font-bold`}
            >
              {formatTime(time)}
            </p>
            <button
              type="button"
              className={`${!isReminding ? 'hidden' : ''} border border-black w-full p-4 rounded-2xl shadow-md font-bold bg-black text-white hover:bg-white hover:text-black`}
              onClick={handleStopReminder}
            >
              done!
            </button>
          </div>
          <div className="flex md:flex-col gap-2">
            <button
              className={`${isRunning ? 'bg-black text-white' : 'bg-white text-black'} font-semibold px-4 py-1 bg-white rounded-md border border-black hover:bg-text hover:text-white hover:border-black`}
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
        <div className="flex flex-col w-full md:w-[50%] rounded-xl bg-cardMain shadow-md px-4">
          <div className="flex flex-row justify-between items-center px-4 pt-2 pb-1 border-b border-black">
            {isAddTodo && isAuthed ? (
              <div className="flex items-center w-full">
                <input
                  type="text"
                  className="flex-grow bg-transparent focus:outline-none"
                  placeholder="new todo?"
                  value={NewTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                  onClick={createTodoHandler}
                  className="pl-2 hover:font-semibold"
                >
                  +add new
                </button>
                <button
                  onClick={() => setIsAddTodo(false)}
                  className="pl-2 hover:font-semibold"
                >
                  back
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm">{todayDate}</p>
                <button
                  onClick={() => setIsAddTodo(true)}
                  className="pl-2 hover:font-semibold"
                  disabled={!isAuthed}
                >
                  {isAuthed ? '+add new' : 'login needed!'}
                </button>
              </>
            )}
          </div>
          {isAuthed ? (
            todos.length > 0 ? (
              <ul className="pt-2 overflow-y-auto">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex flex-row justify-between items-center w-full px-2 "
                  >
                    <p
                      className={`text-md cursor-pointer hover:font-semibold ${todo.completed ? 'line-through' : ''}`}
                      onClick={() =>
                        toggleTodoCompletionHandler(todo.id, todo.completed)
                      }
                    >
                      {todo.title}
                    </p>
                    <button
                      onClick={() => deleteTodoHandler(todo.id)}
                      className="hover:font-semibold"
                    >
                      delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <FaRegFrownOpen className="text-4xl mb-2" />
                <p className="text-xl">no to-do found!</p>
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-xl py-4">you need to login!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
