import { useState } from 'react';

export default function Setting() {
  const [discordEnabled, setDiscordEnabled] = useState(true);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto min-h-[15rem] justify-center items-center gap-2 p-4">
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
      <div className="w-full">
        <div className="flex flex-col gap-4 bg-cardMain p-6 rounded-xl border border-black border-opacity-20">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between">
            <div className="flex flex-row">
              <h1 className="font-semibold text-2xl">meWhenTracker</h1>
              <p className="text-sm">
                <a
                  href="https://github.com/rfsyhb"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="text-blue-500">by limau</span>
                </a>
              </p>
            </div>
            <div className="flex md:flex-col flex-row text-right gap-2">
              <label
                htmlFor="enableDiscord"
                className="font-semibold flex items-center gap-4 px-2 self-end border border-black border-opacity-30 rounded-lg justify-between"
              >
                Discord
                <div className="relative">
                  <input
                    id="enableDiscord"
                    type="checkbox"
                    checked={discordEnabled}
                    onChange={() => setDiscordEnabled(!discordEnabled)}
                    className="sr-only"
                  />
                  <div
                    className={`block w-8 h-4 rounded-full ${discordEnabled ? 'bg-black' : 'bg-gray-400'}`}
                  />
                  <div
                    className={`dot absolute left-0 top-0 bg-white w-4 h-4 border border-gray-400 rounded-full transition ${
                      discordEnabled ? 'transform translate-x-4' : ''
                    }`}
                  />
                </div>
              </label>
              <div className="flex flex-row gap-2">
                <label htmlFor="webhook">
                  <input
                    id="webhook"
                    type="text"
                    value="https://discord.com/api/webhooks/1234567890/abcdefg"
                    onChange={() => alert('Webhook Clicked!')}
                    className="rounded-md px-2 w-16"
                    placeholder="main"
                    disabled={!discordEnabled}
                  />
                </label>
                <label htmlFor="webhookReminder">
                  <input
                    id="webhookReminder"
                    type="text"
                    value="https://discord.com/api/webhooks/1234567890/abcdefg"
                    onChange={() => alert('Webhook Reminder Clicked!')}
                    className="rounded-md px-2 w-16"
                    placeholder="spam"
                    disabled={!discordEnabled}
                  />
                </label>
                <label htmlFor="usernameReminder">
                  <input
                    id="usernameReminder"
                    type="text"
                    value="1234567890"
                    onChange={() => alert('Username Reminder Clicked!')}
                    className="rounded-md px-2 w-16"
                    placeholder="UID"
                    disabled={!discordEnabled}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <label htmlFor="title" className="w-full sm:w-[80%] flex flex-col">
              <span className="text-sm pl-2">title?</span>
              <input
                id="title"
                type="text"
                value="main"
                onChange={() => alert('Title Clicked!')}
                className="rounded-md px-2"
                placeholder="berak"
                // maxLength="25"
              />
            </label>
            <label
              htmlFor="duration"
              className="w-full sm:w-[20%] flex flex-col"
            >
              <span className="text-sm pl-2">how long?</span>
              <input
                id="duration"
                type="number"
                value="25"
                onChange={() => alert('Duration Clicked!')}
                className="rounded-md px-2"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
