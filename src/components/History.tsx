import { FaRegFrownOpen, FaTrash } from 'react-icons/fa';

export default function History() {
  const trueHolder = true;
  return (
    <div className="flex flex-col w-full max-w-lg mx-auto min-h-[15rem] justify-center items-center gap-2 p-4">
      <div className="flex flex-row gap-3">
        <button
          className="bg-text text-white font-semibold px-4 rounded-xl border-2 border-black"
          onClick={() => alert('Main Clicked!')}
        >
          Main
        </button>
        <button
          className="font-semibold px-4 bg-bgColor rounded-xl border-2 border-black hover:bg-text hover:text-white hover:border-black"
          onClick={() => alert('Setting Clicked!')}
        >
          Setting
        </button>
        <button
          className="font-semibold px-4 py-1 bg-bgColor rounded-xl border-2 border-black hover:bg-text hover:text-white hover:border-black"
          onClick={() => alert('History Clicked!')}
        >
          History
        </button>
      </div>
      <div className="w-full flex flex-col bg-cardMain p-4 rounded-xl border border-black border-opacity-20">
        <div className="flex flex-row items-center justify-between px-3 pb-3">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-xl font-semibold">History</h2>
            <p className="text-sm">20 june 2024</p>
          </div>
          <button
            type="button"
            className="text-xl hover:text-red-500 disabled:text-black"
            onClick={() => alert('Clear History Clicked!')}
            disabled={false}
          >
            <FaTrash />
          </button>
        </div>
        <ul className="flex flex-col gap-1 px-1">
          {!trueHolder ? (
            <div className="flex flex-col items-center">
              <FaRegFrownOpen className="text-4xl mb-2" />
              No history found!
            </div>
          ) : (
            <>
              <li
                key="1"
                className="flex flex-row justify-between gap-10 bg-cardAlt p-1 px-3 rounded-xl border border-black border-opacity-10 hover:bg-cardMain hover:border-opacity-100"
              >
                <p>project/figmaDesign</p>
                <p>
                  25
                  <span className="text-sm">m</span>
                </p>
              </li>
              <li
                key="1"
                className="flex flex-row justify-between gap-10 bg-cardAlt p-1 px-3 rounded-xl border border-black border-opacity-10 hover:bg-cardMain hover:border-opacity-100"
              >
                <p>project/backend</p>
                <p>
                  25
                  <span className="text-sm">m</span>
                </p>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
