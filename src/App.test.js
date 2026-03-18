import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders localized home page', async () => {
  render(
    <MemoryRouter initialEntries={['/en']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Premium vehicles by individual pre-order/i)).toBeInTheDocument();
});
