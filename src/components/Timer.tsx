import { FaRegFrownOpen } from 'react-icons/fa';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigationButtons from './NavigationButtons';
import { useEffect, useState } from 'react';
import { getUserProfile, logout } from '../slices/userSlice';

export default function Timer() {
  const dispatch = useDispatch<AppDispatch>();
  const [isAddTodo, setIsAddTodo] = useState(false);
  const [NewTodo, setNewTodo] = useState('');
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthed = user ? true : false;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch]);

  const logoutHandler = () => dispatch(logout());

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto min-h-[15rem] justify-center items-center gap-2 p-4">
      <div className="flex flex-col sm:flex-row w-full justify-between px-6 gap-4 sm:gap-0">
        <div className="flex flex-row items-center gap-2">
          {isAuthed ? (
            <>
              <p className="text-xl font-semibold">Hello {user!.name}</p>
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
        <NavigationButtons />
      </div>
      <div className="flex flex-col md:flex-row w-full h-auto md:h-48 justify-center gap-4">
        <div className="flex flex-col md:flex-row w-full md:w-[50%] justify-center items-center rounded-xl gap-3 md:gap-8 bg-cardMain shadow-md p-4">
          <p className="text-6xl md:text-8xl font-bold">25:00</p>
          <div className="flex md:flex-col gap-2">
            <button
              className="font-semibold px-4 py-1 bg-white rounded-md border border-black hover:bg-text hover:text-white hover:border-black"
              onClick={() => alert('Start Button Clicked')}
            >
              Start
            </button>
            <button
              className="font-semibold px-4 py-1 bg-white rounded-md border border-black hover:bg-text hover:text-white hover:border-black"
              onClick={() => alert('Pause Button Clicked')}
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
                  onClick={() => setIsAddTodo(false)}
                  className="pl-2 hover:font-semibold"
                >
                  +add new
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm">10 July 2024</p>
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
          <div className="flex flex-col justify-center items-center h-full">
            {isAuthed ? (
              <>
                <FaRegFrownOpen className="text-4xl mb-2" />
                <p className="text-xl">no to-do found!</p>
              </>
            ) : (
              <>
                <p className="text-xl py-4">you need to login!</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
