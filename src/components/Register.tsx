import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../slices/userSlice';
import { AppDispatch } from '../app/store';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(registerUser({ name: fullName, username, password })).unwrap();
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto min-h-[15rem] justify-center items-center gap-8 p-4">
      <div className="flex flex-row items-center justify-start gap-2 w-full">
        <Link to="/login" className="text-blue-700">
          <span className="text-lg hover:font-semibold">
            already have account?
          </span>
        </Link>
      </div>

      <form className="flex flex-col w-[70%] gap-3" onSubmit={registerHandler}>
        <label
          htmlFor="mewhen-name"
          className="font-semibold flex flex-row gap-2 group"
        >
          <span className="w-[30%] group-hover:translate-x-3">full name</span>
          <input
            type="text"
            id="mewhen-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`w-[70%] rounded-md bg-cardMain shadow-sm p-1 border border-black border-opacity-20 font-normal group-hover:border-opacity-70 ${isHovered ? 'outline outline-1 outline-green-600' : 'outline-none'}`}
            required
          />
        </label>
        <label
          htmlFor="mewhen-username"
          className="font-semibold flex flex-row gap-2 group"
        >
          <span className="w-[30%] group-hover:translate-x-3">username</span>
          <input
            type="text"
            id="mewhen-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-[70%] rounded-md bg-cardMain shadow-sm p-1 border border-black border-opacity-20 font-normal group-hover:border-opacity-70 ${isHovered ? 'outline outline-1  outline-green-600' : 'outline-none'}`}
            required
          />
        </label>
        <label
          htmlFor="mewhen-password"
          className="font-semibold flex flex-row gap-2 group"
        >
          <span className="w-[30%] group-hover:translate-x-3">password</span>
          <input
            type="password"
            id="mewhen-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-[70%] rounded-md bg-cardMain shadow-sm p-1 border border-black border-opacity-20 font-normal group-hover:border-opacity-70 ${isHovered ? 'outline outline-1  outline-green-600' : 'outline-none'}`}
            required
          />
        </label>
        <button
          type="submit"
          className="rounded-lg shadow-sm hover:shadow-md border border-black"
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <span className="flex justify-end p-1 pr-3">register</span>
        </button>
      </form>
    </div>
  );
}
