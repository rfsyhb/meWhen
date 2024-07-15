import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import useTodayDate from '../../hooks/useTodayDate';
import { createTodo, deleteTodo, updateTodo } from '../../slices/todoSlice';
import { FaRegFrownOpen } from 'react-icons/fa';

const TodoList: React.FC = () => {
  const [isAddTodo, setIsAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const isAuthed = useSelector((state: RootState) => state.user.isAuthed);
  const { todayDate } = useTodayDate();

  const createTodoHandler = async () => {
    await dispatch(createTodo({ title: newTodo }));
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
    await dispatch(updateTodo({ id, todo: { completed: !completed } }));
  };

  return (
    <div className="flex flex-col w-full md:w-[50%] rounded-xl bg-cardMain shadow-md px-4">
      <div className="flex flex-row justify-between items-center px-4 pt-2 pb-1 border-b border-black">
        {isAddTodo && isAuthed ? (
          <div className="flex items-center w-full">
            <input
              type="text"
              className="flex-grow bg-transparent focus:outline-none"
              placeholder="new todo?"
              value={newTodo}
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
  );
};

export default TodoList;
