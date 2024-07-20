import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';

interface LinkNavigationProps {
  links: { path: string; label: string }[];
}

const LinkNavigation: React.FC<LinkNavigationProps> = ({ links }) => {
  const userError = useSelector((state: RootState) => state.user.error);

  return (
    <div className="flex flex-row items-center justify-start gap-2 w-full">
      {links.map(({ path, label }) => (
        <Link key={path} to={path} className="text-blue-700">
          <span className="text-lg hover:font-semibold">{label}</span>
        </Link>
      ))}
      {userError && <p className="text-red-500">{userError}</p>}
    </div>
  );
};

export default LinkNavigation;
