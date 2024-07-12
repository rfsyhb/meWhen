import { FaRegFrownOpen, FaTrash } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import NavigationButtons from './NavigationButtons';
import { useDispatch, useSelector } from 'react-redux';
import useTodayDate from '../hooks/useTodayDate';
import { clear, loadHistory } from '../slices/historySlice';
import { useEffect } from 'react';

// Define a type for history items
interface HistoryItem {
  title: string;
  time: string;
}

export default function History() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const history = useSelector(
    (state: RootState) => state.history.history as HistoryItem[]
  );
  const { todayDate } = useTodayDate();

  useEffect(() => {
    dispatch(loadHistory());
  }, [dispatch]);

  const handleClearHistory = () => {
    dispatch(clear());
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto min-h-[15rem] justify-center items-center gap-2 p-4">
      <NavigationButtons location={location.pathname} />
      <div className="w-full flex flex-col bg-cardMain p-4 rounded-xl border border-black border-opacity-20">
        <div className="flex flex-row items-center justify-between px-3 pb-3">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-xl font-semibold">History</h2>
            <p className="text-sm">{todayDate}</p>
          </div>
          <button
            type="button"
            className="text-xl hover:text-red-500 disabled:text-black"
            onClick={handleClearHistory}
            disabled={history.length === 0}
          >
            <FaTrash />
          </button>
        </div>
        <ul className="flex flex-col gap-1 px-1">
          {history.length === 0 ? (
            <div className="flex flex-col items-center">
              <FaRegFrownOpen className="text-4xl mb-2" />
              No history found!
            </div>
          ) : (
            history.map((item, index) => (
              <li
                key={index}
                className="flex flex-row justify-between gap-10 bg-cardAlt p-1 px-3 rounded-xl border border-black border-opacity-10 hover:bg-cardMain hover:border-opacity-100"
              >
                <p>{item.title}</p>
                <p>
                  {item.time}
                  <span className="text-sm">m</span>
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
