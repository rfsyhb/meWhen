import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface TimerDisplayProps {
  formatTime: (seconds: number) => string;
  handleStopReminder: () => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  formatTime,
  handleStopReminder,
}) => {
  const time = useSelector((store: RootState) => store.timer.time);
  const isReminding = useSelector(
    (store: RootState) => store.timer.isReminding
  );

  return (
    <div className="flex flex-col flex-grow items-center">
      <p
        className={`${!isReminding ? '' : 'hidden'} text-6xl md:text-8xl font-bold`}
      >
        {formatTime(time)}
      </p>
      <button
        type="button"
        className={`${!isReminding ? 'hidden' : ''} border border-black w-full p-4 rounded-2xl shadow-md font-bold bg-black text-white hover:bg-white hover:text-black`}
        onClick={handleStopReminder}
      >
        done!
      </button>
    </div>
  );
};

export default TimerDisplay;
