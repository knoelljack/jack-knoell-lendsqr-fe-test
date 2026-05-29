import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders the label and comma-formatted value', () => {
    render(
      <StatCard
        icon="card-users"
        iconAccent="#DF18FF"
        label="Users"
        value={12345}
      />,
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('12,345')).toBeInTheDocument();
  });
});
