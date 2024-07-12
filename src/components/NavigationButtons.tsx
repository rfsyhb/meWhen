import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

interface NavigationButtonsProps {
  location: string;
}

export default function NavigationButtons({
  location,
}: NavigationButtonsProps) {
  return (
    <div className="flex flex-row gap-3">
      <Link to="/">
        <button
          className={`font-semibold px-4 py-1 bg-bgColor rounded-xl border-2 border-black hover:bg-text hover:text-white hover:border-black ${location === '/' ? 'bg-text text-white border-black' : ''}`}
        >
          Main
        </button>
      </Link>
      <Link to="/setting">
        <button
          className={`font-semibold px-4 py-1 bg-bgColor rounded-xl border-2 border-black hover:bg-text hover:text-white hover:border-black ${location === '/setting' ? 'bg-text text-white border-black' : ''}`}
        >
          Setting
        </button>
      </Link>
      <Link to="/history">
        <button
          className={`font-semibold px-4 py-1 bg-bgColor rounded-xl border-2 border-black hover:bg-text hover:text-white hover:border-black ${location === 'history' ? 'bg-text text-white border-black' : ''}`}
        >
          History
        </button>
      </Link>
    </div>
  );
}

NavigationButtons.propTypes = {
  location: PropTypes.string.isRequired,
};
