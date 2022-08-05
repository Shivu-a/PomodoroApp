import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faPause,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PauseButton } from './timer/PauseButton';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Timer = () => {
  const location = useLocation();

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [isPaused, setIsPaused] = useState(true);
  const [isBreakTime, setIsBreakTime] = useState(false);

  const [timer, setTimer] = useState([]);

  const calling = async () => {
    const selectedTimer = await window.electron.getUserSelectedTimer();
    setTimer(await selectedTimer);
  };
  const audio = new Audio();

  useEffect(() => {
    calling();
  }, []);

  useEffect(() => {
    setMinutes(timer[0]);
  }, [timer]);

  const pause = () => {
    console.log(!isPaused ? 'Pausado' : 'Reanudado');
    setIsPaused(!isPaused);
  };

  const stop = () => {
    setIsPaused(!isPaused);
    setIsBreakTime(!isBreakTime);
    setMinutes(!isBreakTime ? timer[1] : timer[0]);
    sendNotification();
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

  const reset = () => {
    setMinutes(timer[0]);
    setSeconds(0);
    setIsPaused(true);
  };

  const sendNotification = async () => {
    const directorio = await window.electron.notify();
    audio.src = directorio.soundDir;

    const notificacion = new Notification('Pomodoro Ended', {
      body: !isBreakTime ? 'Is time for a break!' : 'Time to work!',
      icon: directorio.iconDir,
    });

    audio.play();
  };

  return (
    <div className="flex flex-col gap-8 w-full h-screen justify-center items-center bg-zinc-900">
      <Link to="/settings">
        <FontAwesomeIcon
          className="h-12 aspect-square fixed top-1 right-1 text-gray-50"
          icon={faGear}
        />
      </Link>

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
