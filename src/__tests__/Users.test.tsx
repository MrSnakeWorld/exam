import '@testing-library/jest-dom';
import Users from '../renderer/pages/Users/Users';

describe('App', () => {
  it('Страница должна загрузиться', () => {
    expect(<Users />).toBeTruthy();
  });
});
