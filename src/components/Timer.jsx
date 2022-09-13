import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faPause,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';

import { Link, useLocation } from 'react-router-dom';
import { PauseButton } from './timer/PauseButton';

import { usePomodoro } from 'hooks/usePomodoro';
import { PomodoroBar } from './timer/PomodoroBar';
import { useContext } from 'react';
import { TimerContext } from 'context/TimerContext';

export const Timer = () => {
  const location = useLocation();

  const { seconds, minutes, isBreakTime, isPaused, timer, pause, stop, reset } =
    useContext(TimerContext);

  return (
    <div className="flex flex-col gap-8 w-full h-screen justify-center items-center bg-zinc-900">
      <Link to="/settings">
        <FontAwesomeIcon
          className="h-12 aspect-square fixed top-1 right-1 text-gray-50"
          icon={faGear}
        />
      </Link>

      <PomodoroBar props={{ minutes, seconds, isBreakTime, timer }} />

      <div className="flex gap-4">
        <PauseButton
          texto={
            isPaused ? (
              <FontAwesomeIcon
                className="text-4xl aspect-square"
                icon={faPlay}
              />
            ) : (
              <FontAwesomeIcon
                className="text-4xl aspect-square"
                icon={faPause}
              />
            )
          }
          evento={pause}
        />

        <button
          onClick={() => {
            reset();
          }}
          className="p-4 aspect-square w-max bg-rose-900 text-warmGray-300 font-bold rounded-full"
        >
          <FontAwesomeIcon className="text-4xl aspect-square" icon={faStop} />
        </button>
      </div>
    </div>
  );
};
