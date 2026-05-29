import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  describe('positive', () => {
    it.each(['Active', 'Inactive', 'Pending', 'Blacklisted'] as const)(
      'renders %s with the matching data-variant',
      (status) => {
        render(<StatusBadge status={status} />);
        const badge = screen.getByText(status);
        expect(badge).toHaveAttribute('data-variant', status.toLowerCase());
      },
    );
  });

  describe('negative', () => {
    it('falls back to the neutral variant for an unknown status', () => {
      render(<StatusBadge status="Disabled" />);
      expect(screen.getByText('Disabled')).toHaveAttribute(
        'data-variant',
        'neutral',
      );
    });
  });
});
