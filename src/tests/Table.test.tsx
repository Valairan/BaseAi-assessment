import { render, screen } from '@testing-library/react';
import Table from '../components/Table';

const data = [
  { id: 1, name: 'Alice', status: 'active' },
  { id: 2, name: 'Bob', status: 'inactive' },
];

test('renders table rows', () => {
  render(<Table data={data} />);
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Bob')).toBeInTheDocument();
});
