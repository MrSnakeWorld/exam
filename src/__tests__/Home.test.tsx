import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from 'renderer/pages/Home/Home';

describe('Home', () => {
  it('should render', () => {
    expect(render(<Home />)).toBeTruthy();
  });
});
