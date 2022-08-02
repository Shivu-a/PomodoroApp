import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
      <button
        className={`p-4 px-8 bg-${isPaused ? 'green' : 'red'}-500 rounded-md`}
        onClick={() => {
          pause();
        }}
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
};
