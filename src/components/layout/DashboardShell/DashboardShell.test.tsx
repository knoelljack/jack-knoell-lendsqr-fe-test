import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardShell } from './DashboardShell';

jest.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

describe('DashboardShell mobile drawer', () => {
  describe('positive', () => {
    it('opens the drawer when the hamburger button is clicked', async () => {
      const user = userEvent.setup();
      render(<DashboardShell>content</DashboardShell>);

      expect(screen.queryByTestId('drawer-backdrop')).not.toBeInTheDocument();

      await user.click(
        screen.getByRole('button', { name: /open navigation menu/i }),
      );

      expect(screen.getByTestId('drawer-backdrop')).toBeInTheDocument();
    });

    it('closes the drawer when the backdrop is clicked', async () => {
      const user = userEvent.setup();
      render(<DashboardShell>content</DashboardShell>);

      await user.click(
        screen.getByRole('button', { name: /open navigation menu/i }),
      );
      await user.click(screen.getByTestId('drawer-backdrop'));

      expect(screen.queryByTestId('drawer-backdrop')).not.toBeInTheDocument();
    });

    it('closes the drawer when Escape is pressed', async () => {
      const user = userEvent.setup();
      render(<DashboardShell>content</DashboardShell>);

      await user.click(
        screen.getByRole('button', { name: /open navigation menu/i }),
      );
      await user.keyboard('{Escape}');

      expect(screen.queryByTestId('drawer-backdrop')).not.toBeInTheDocument();
    });
  });

  describe('negative', () => {
    it('does not render the backdrop until the drawer is opened', () => {
      render(<DashboardShell>content</DashboardShell>);
      expect(screen.queryByTestId('drawer-backdrop')).not.toBeInTheDocument();
    });
  });
});
