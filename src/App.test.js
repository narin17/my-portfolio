import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero headline', () => {
  render(<App />);
  expect(screen.getByText(/Hi, I’m/i)).toBeInTheDocument();
  expect(screen.getByText(/Un Titnarin/i)).toBeInTheDocument();
});
