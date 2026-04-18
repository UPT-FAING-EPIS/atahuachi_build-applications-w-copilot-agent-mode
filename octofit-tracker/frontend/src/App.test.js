import { render, screen } from '@testing-library/react';
import App from './App';

test('renders octofit tracker hero text', () => {
  render(<App />);
  const headingElement = screen.getByText(/track every rep, run and result in one place/i);
  expect(headingElement).toBeInTheDocument();
});
