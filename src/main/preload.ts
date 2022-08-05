import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  requestTimers: (message: string) =>
    ipcRenderer.invoke('requestTimers', message),
  setUserSelectedTimer: (message: string) =>
    ipcRenderer.invoke('setUserSelectedTimer', message),
  getUserSelectedTimer: (message: string) =>
    ipcRenderer.invoke('getUserSelectedTimer', message),
  addUserTimer: (message: string) =>
    ipcRenderer.invoke('addUserTimer', message),
  deleteUserTimer: () => {
    ipcRenderer.invoke('deleteUserTimer');
  },
  notify: (message: string) => {
    return ipcRenderer.invoke('notify', message);
  },
});
