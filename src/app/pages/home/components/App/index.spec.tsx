import React from 'react';
import { render } from '@testing-library/react';
import App from './index';

describe('App dummy Component', () => {
  it('should render', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
