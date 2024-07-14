import { Link } from 'react-router-dom';

interface LinkNavigationProps {
  links: { path: string; label: string }[];
}

const LinkNavigation: React.FC<LinkNavigationProps> = ({ links }) => (
  <div className="flex flex-row items-center justify-start gap-2 w-full">
    {links.map(({ path, label }) => (
      <Link key={path} to={path} className="text-blue-700">
        <span className="text-lg hover:font-semibold">{label}</span>
      </Link>
    ))}
  </div>
);

export default LinkNavigation;
