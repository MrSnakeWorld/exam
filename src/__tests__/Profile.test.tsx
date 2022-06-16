import '@testing-library/jest-dom';
import Profile from '../renderer/pages/Profile/Profile';

describe('Profile', () => {
  it('Страница должна загрузиться', () => {
    expect(<Profile />).toBeTruthy();
  });
});
