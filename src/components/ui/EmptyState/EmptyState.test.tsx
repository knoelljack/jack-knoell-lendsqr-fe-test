import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the title and body when both are provided', () => {
    render(<EmptyState title="Documents" body="Coming soon." />);
    expect(screen.getByRole('heading', { name: 'Documents' })).toBeInTheDocument();
    expect(screen.getByText('Coming soon.')).toBeInTheDocument();
  });

  it('renders without a body when only the title is provided', () => {
    render(<EmptyState title="Documents" />);
    expect(screen.getByRole('heading', { name: 'Documents' })).toBeInTheDocument();
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  });
});
