import { contextBridge } from 'electron';
import api from './api';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('api', { ...api });
