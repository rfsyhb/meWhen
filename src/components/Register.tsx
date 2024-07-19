import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../slices/userSlice';
import { AppDispatch } from '../app/store';
import AuthForm from './common/AuthForm';
import InputField from './common/InputField';
import LinkNavigation from './common/LinkNavigation';
import useInput from '../hooks/useInput';

export default function Register() {
  const [fullName, onFullNameChange] = useInput('');
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        registerUser({ name: fullName, username, password })
      ).unwrap();
      alert('Registration successful!');
      navigate('/login');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto min-h-[15rem] justify-center items-center gap-8 p-4">
      <LinkNavigation
        links={[{ path: '/login', label: 'already have account?' }]}
      />
      <AuthForm onSubmit={registerHandler} formUsage="register">
        <InputField
          id="mewhen-name"
          label="full name"
          type="text"
          value={fullName}
          onChange={onFullNameChange}
        />
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
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
      </AuthForm>
    </div>
  );
}
