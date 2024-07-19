import { loginUser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';
import LinkNavigation from './common/LinkNavigation';
import AuthForm from './common/AuthForm';
import InputField from './common/InputField';
import useInput from '../hooks/useInput';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      alert('Login successful!');
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto min-h-[15rem] justify-center items-center gap-8 p-4">
      <LinkNavigation
        links={[
          { path: '/', label: 'home?' },
          { path: '/register', label: 'register?' },
        ]}
      />

      <AuthForm onSubmit={handleLogin} formUsage="login">
        <InputField
          id="mewhen-username"
          label="username"
          type="text"
          value={username}
          onChange={onUsernameChange}
        />
        <InputField
          id="mewhen-password"
          label="password"
          onChange={onPasswordChange}
          type="password"
          value={password}
        />
      </AuthForm>
    </div>
  );
}
