import { FaRegFrownOpen } from 'react-icons/fa';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigationButtons from './NavigationButtons';
import { useEffect, useState } from 'react';
import { getUserProfile, logout } from '../slices/userSlice';
import { createTodo, deleteTodo, fetchUserTodos } from '../slices/todoSlice';

export default function Timer() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const todos = useSelector((state: RootState) => state.todo.todos);
  const isAuthed = useSelector((state: RootState) => state.user.isAuthed);
  const [isAddTodo, setIsAddTodo] = useState(false);
  const [NewTodo, setNewTodo] = useState('');

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

  const createTodoHandler = async () => {
    await dispatch(createTodo({ title: NewTodo }));
    setIsAddTodo(false);
    setNewTodo('');
  };

  const deleteTodoHandler = async (id: string) => {
    await dispatch(deleteTodo(id));
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

          {isAuthed ? (
            todos.length > 0 ? (
              <ul className="pt-2 overflow-y-auto">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex flex-row justify-between items-center w-full px-2 "
                  >
                    <p className="text-md">{todo.title}</p>

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
