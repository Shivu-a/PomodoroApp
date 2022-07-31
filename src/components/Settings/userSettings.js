const Store = require('electron-store');
const storage = new Store();

// Get and Save window size
export const getWinSettings = () => {
  const defaultBounds = [1024, 728];

  const size = storage.get('winSize');

  if (size) return size;
  else {
    storage.set('winSize', defaultBounds);
    return defaultBounds;
  }
};

export const saveBounds = (bounds) => {
  storage.set('winSize', bounds);
  console.log('Bounds: ' + bounds);
};

// Get and Save window position
export const getWinPosition = () => {
  const defaultWinPosition = [null, null];

  const userWinPosition = storage.get('winPosition');

  if (userWinPosition) return userWinPosition;
  else {
    storage.set('winPosition', defaultWinPosition);
    return defaultWinPosition;
  }
};

export const saveWindowPosition = (position) => {
  storage.set('winPosition', position);
};

// Get and save user custom timers
export const getUserTimers = () => {
  const userTimers = storage.get('userCustomTimer');

  if (userTimers) return userTimers;
  else {
    return false;
  }
};

export const saveUserTimers = (timer) => {
  storage.set('userTimers', timer);
};

// Get and save user selected timer: used when selecting a timer and when initiating a pomodoro
export const getUserSelectedTimer = () => {
  const selectedTimer = storage.get('userSelectedTimer');

  if (selectedTimer) return selectedTimer;
  else {
    return [20, 10];
  }
};

export const setUserSelectedTimer = (timer) => {
  storage.set('userSelectedTimer', timer);
};

// Añadir timer de usuario ya sea a un array o a un objeto pero de alguna forma tiene que ser iterable

export const addUserTimer = (timer) => {
  console.log(timer);
  storage.set('userCustomTimer', timer);
};
