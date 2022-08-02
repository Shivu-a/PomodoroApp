import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PauseButton } from './timer/PauseButton';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Timer = () => {
  const location = useLocation();
  const timer = location.state.timer;

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [isPaused, setIsPaused] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    setMinutes(timer[0]);
  }, []);

  const pause = () => {
    console.log(!isPaused ? 'Pausado' : 'Reanudado');
    setIsPaused(!isPaused);
  };

  const stop = () => {
    setIsPaused(!isPaused);
    setIsBreakTime(!isBreakTime);
    setMinutes(isBreakTime ? timer[1] : timer[0]);
  };

  let pomodoro;
  useEffect(() => {
    pomodoro = setInterval(() => {
      if (isPaused) return;
      if (minutes == 0 && seconds == 0) {
        stop();
        return;
      }

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
    <div className="flex flex-col gap-8 w-full h-screen justify-center items-center bg-zinc-900">
      <CircularProgressbarWithChildren
        strokeWidth={4}
        value={minutes * 60 + seconds}
        maxValue={isBreakTime ? timer[1] * 60 : timer[0] * 60}
        minValue={0}
        background={true}
        styles={buildStyles({
          pathColor: isBreakTime ? 'rgb(0,255,0,0.8)' : 'rgba(255,0,0,0.8)',
          trailColor: 'rgba(0,0,0,0.6)',
          backgroundColor: 'rgba(0,0,0,0.3)',
        })}
      >
        <div className="font-extrabold text-4xl text-warmGray-300">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </CircularProgressbarWithChildren>

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

        <button className="p-4 aspect-square w-max bg-rose-900 text-warmGray-300 font-bold rounded-full">
          <FontAwesomeIcon className="text-4xl aspect-square" icon={faStop} />
        </button>
      </div>
    </div>
  );
};
