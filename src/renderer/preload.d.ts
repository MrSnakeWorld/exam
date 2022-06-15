import { Channels } from 'main/preload';

declare global {
  interface Window {
    api: typeof import('../main/api').default;
  }
}

export {};
