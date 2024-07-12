import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavigationButtons() {
  const [page, setPage] = useState('');

  return (
    <div className="flex flex-row gap-3">
      <Link to="/">
        <button
          className={`font-semibold px-4 py-1 bg-bgColor rounded-xl border-2 border-black hover:bg-text hover:text-white hover:border-black ${page === 'main' ? 'bg-text text-white border-black' : ''}`}
          onClick={() => setPage('main')}
        >
          Main
        </button>
      </Link>
      <Link to="/setting">
        <button
          className={`font-semibold px-4 py-1 bg-bgColor rounded-xl border-2 border-black hover:bg-text hover:text-white hover:border-black ${page === 'setting' ? 'bg-text text-white border-black' : ''}`}
          onClick={() => setPage('setting')}
        >
          Setting
        </button>
      </Link>
      <Link to="/history">
        <button
          className={`font-semibold px-4 py-1 bg-bgColor rounded-xl border-2 border-black hover:bg-text hover:text-white hover:border-black ${page === 'history' ? 'bg-text text-white border-black' : ''}`}
          onClick={() => setPage('history')}
        >
          History
        </button>
      </Link>
    </div>
  );
}
