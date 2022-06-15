import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Profile from 'renderer/pages/Profile/Profile';

describe('Profile', () => {
  it('should render', () => {
    expect(render(<Profile />)).toBeTruthy();
  });
});
