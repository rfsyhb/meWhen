import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import LinkNavigation from './LinkNavigation';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';

const UserProfileSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthed = useSelector((state: RootState) => state.user.isAuthed);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-row items-center gap-2">
      {isAuthed && user ? (
        <>
          <p className="text-xl font-semibold">Hellp {user.name}</p>
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
          <LinkNavigation
            links={[
              { label: 'login?', path: '/login' },
              { label: 'register?', path: '/register' },
            ]}
          />
        </>
      )}
    </div>
  );
};

export default UserProfileSection;
