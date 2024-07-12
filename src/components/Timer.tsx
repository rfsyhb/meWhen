import { useState } from 'react';
import { FaRegFrownOpen } from 'react-icons/fa';

export default function Timer() {
  const [isAuthed, setIsAuthed] = useState(false);
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto min-h-[15rem] justify-center items-center gap-2 p-4">
      <div className="flex flex-col sm:flex-row w-full justify-between px-6 gap-4 sm:gap-0">
        <div className="flex flex-row items-center gap-2">
          {isAuthed ? (
            <>
              <p className="text-xl font-semibold">Hello Rafi Syihab!</p>
              <a className="text-blue-700" href="github.com" target="_blank">
                logout?
              </a>
            </>
          ) : (
            <>
              <a className="text-blue-700" href="github.com" target="_blank">
                <span className="text-lg hover:font-semibold">login?</span>
              </a>
              <a className="text-blue-700" href="github.com" target="_blank">
                <span className="text-lg hover:font-semibold">register?</span>
              </a>
            </>
          )}
        </div>
        <div className="flex flex-row gap-3">
          <button
            className="bg-text text-white font-semibold px-4 rounded-xl border-2 border-black"
            onClick={() => setIsAuthed(!isAuthed)}
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
      </div>
      <div className="flex flex-col md:flex-row w-full h-auto md:h-48 justify-center gap-4">
        <div className="flex flex-col md:flex-row w-full md:w-[50%] justify-center items-center rounded-xl gap-3 md:gap-8 bg-cardMain shadow-md p-4">
          <p className="text-6xl md:text-8xl font-bold">25:00</p>
          <div className="flex md:flex-col gap-2">
            <button
              className="font-semibold px-4 py-1 bg-white rounded-md border border-black hover:bg-text hover:text-white hover:border-black"
              onClick={() => alert('Start Button Clicked')}
            >
              Start
            </button>
            <button
              className="font-semibold px-4 py-1 bg-white rounded-md border border-black hover:bg-text hover:text-white hover:border-black"
              onClick={() => alert('Pause Button Clicked')}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-[50%] rounded-xl bg-cardMain shadow-md px-4">
          <div className="flex flex-row justify-between items-center px-4 pt-2 pb-1 border-b border-black">
            <p className="text-sm">10 July 2024</p>
            <button onClick={() => alert('added')}>+add</button>
          </div>
          <div className="flex flex-col justify-center items-center h-full">
            {isAuthed ? (
              <>
                <FaRegFrownOpen className="text-4xl mb-2" />
                <p className="text-xl">no to-do found!</p>
              </>
            ) : (
              <>
                <p className="text-xl py-4">you need to login!</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
