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
    console.log(isPaused ? 'Pausado' : 'Reanudado');
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
    <div className="flex flex-col w-full h-screen justify-center items-center bg-teal-900">
      <div>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <PauseButton texto={isPaused ? 'Resume' : 'Pause'} evento={pause} />
    </div>
  );
};
