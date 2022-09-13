import { useEffect, useState } from 'react';

export const usePomodoro = () => {
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
    setIsBreakTime(false);
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

  const [userTimers, setUserTimers] = useState([]);

  const getUserTimers = async () => {
    const timer = await window.electron.requestTimers('Requesting user timers');
    setUserTimers(await timer);
  };

  useEffect(() => {
    getUserTimers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let selectedOption = e.target.children[0].value;
    let userSelection = selectedOption.split('/');
    window.electron.setUserSelectedTimer(userSelection, userSelection);
    calling();
  };

  const deleteTimer = () => {
    window.electron.deleteUserTimer();
  };

  const addTimer = async (e) => {
    e.preventDefault();
    const [firstValue, secondValue] = e.target.querySelectorAll('input');

    const timeConcentrating = firstValue.value;
    const breakTime = secondValue.value;

    const tempo = [timeConcentrating, breakTime];

    window.electron.addUserTimer(tempo, tempo);
  };

  return {
    seconds,
    minutes,
    isBreakTime,
    isPaused,
    timer,
    pause,
    stop,
    reset,
    userTimers,
    setUserTimers,
    handleSubmit,
    deleteTimer,
    addTimer,
    getUserTimers,
  };
};
