import { ipcRenderer, ipcMain } from 'electron';
import create from './create';
import init from './init';
import read from './read';
import update from './update';
import remove from './delete';
import initData from './initData';

const api = {
  create,
  read,
  update,
  delete: remove,
  init,
  initData,
  hideWindow: () => {
    ipcRenderer.send('hideWindow');
  },
  fullscreenWindow: () => {
    ipcRenderer.send('fullscreenWindow');
  },
  closeWindow: () => {
    ipcRenderer.send('closeWindow');
  },
};

export default api;
