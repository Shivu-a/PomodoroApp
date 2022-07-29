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
  const userTimers = storage.get('userTimers');

  if (userTimers) return userTimers;
  else {
    return null;
  }
};

export const saveUserTimers = (timer) => {
  storage.set('userTimers', timer);
};
