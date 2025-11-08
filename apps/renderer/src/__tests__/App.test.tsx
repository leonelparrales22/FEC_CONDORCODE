import { render, screen } from '@testing-library/react';
import App from '../App';

test('renderiza el formulario de factura', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('RUC')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Razón Social')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Total')).toBeInTheDocument();
});
