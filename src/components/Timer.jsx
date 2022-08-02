import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PauseButton } from './timer/PauseButton';

export const Timer = () => {
  const location = useLocation();
  const timer = location.state.timer;

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setMinutes(timer[0]);
  }, []);

  const pause = () => {
    console.log(!isPaused ? 'Pausado' : 'Reanudado');
    setIsPaused(!isPaused);
  };

  const stop = () => {
    setIsPaused(!isPaused);
  };

  let pomodoro;
  useEffect(() => {
    pomodoro = setInterval(() => {
      if (isPaused) return;

      setSeconds(seconds - 1);

      if (seconds == 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }

      if (minutes == 0 && seconds == 0) {
        stop();
        return;
      }
    }, 1000);

    return () => {
      clearInterval(pomodoro);
    };
  });

  return (
    <div className="flex flex-col gap-8 w-full h-screen justify-center items-center bg-teal-900">
      <div className="text-6xl font-bold">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
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

        <button className="p-4 aspect-square w-max bg-slate-900 text-warmGray-300 font-bold rounded-full">
          <FontAwesomeIcon className="text-4xl aspect-square" icon={faStop} />
        </button>
      </div>
    </div>
  );
};
