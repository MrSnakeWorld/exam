import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      api: typeof import('../main/api').default;
    };
  }
}

export {};
