import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-2xl font-semibold">Not Found!</p>
      <button
        className="flex flex-row items-center gap-2"
        type="button"
        onClick={() => navigate('/')}
      >
        <FaArrowLeftLong />{' '}
        <span className="text-blue-500 font-semibold text-lg">
          Back to Homepage
        </span>
      </button>
    </div>
  );
}
