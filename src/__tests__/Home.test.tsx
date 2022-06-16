import '@testing-library/jest-dom';
import Home from '../renderer/pages/Home/Home';

describe('Home', () => {
  it('Страница должна загрузиться', () => {
    expect(<Home />).toBeTruthy();
  });
});
