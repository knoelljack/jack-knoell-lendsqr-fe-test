import { render, screen } from '@testing-library/react';
import { UsersTableSkeleton } from './UsersTableSkeleton';

describe('UsersTableSkeleton', () => {
  it('renders the configured number of skeleton rows + the header row', () => {
    render(<UsersTableSkeleton rows={5} />);
    const rows = screen.getAllByRole('row');
    // header row + 5 skeleton rows
    expect(rows).toHaveLength(6);
  });

  it('defaults to 10 rows when the prop is omitted', () => {
    render(<UsersTableSkeleton />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(11);
  });
});
