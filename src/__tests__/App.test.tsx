import '@testing-library/jest-dom';
import App from '../renderer/App';

describe('App', () => {
  it('Страница должна загрузиться', () => {
    expect(<App />).toBeTruthy();
  });
});
