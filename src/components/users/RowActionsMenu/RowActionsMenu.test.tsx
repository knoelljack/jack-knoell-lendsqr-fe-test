import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RowActionsMenu } from './RowActionsMenu';
import { makeFakeUser } from '@/test-utils/fakeUser';

describe('RowActionsMenu', () => {
  describe('positive', () => {
    it('opens the menu when the trigger is clicked', async () => {
      const user = userEvent.setup();
      render(<RowActionsMenu user={makeFakeUser({ status: 'Pending' })} />);

      const trigger = screen.getByRole('button', { name: /actions for/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('menuitem', { name: /view details/i })).toBeInTheDocument();
    });

    it('calls onBlacklist when Blacklist User is clicked for a non-blacklisted user', async () => {
      const user = userEvent.setup();
      const onBlacklist = jest.fn();
      const fakeUser = makeFakeUser({ status: 'Pending' });
      render(<RowActionsMenu user={fakeUser} onBlacklist={onBlacklist} />);

      await user.click(screen.getByRole('button', { name: /actions for/i }));
      await user.click(screen.getByRole('menuitem', { name: /blacklist user/i }));

      expect(onBlacklist).toHaveBeenCalledWith(fakeUser);
    });

    it('closes when Escape is pressed', async () => {
      const user = userEvent.setup();
      render(<RowActionsMenu user={makeFakeUser({ status: 'Pending' })} />);

      const trigger = screen.getByRole('button', { name: /actions for/i });
      await user.click(trigger);
      await user.keyboard('{Escape}');

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('negative', () => {
    it('disables Blacklist User when the user is already Blacklisted', async () => {
      const user = userEvent.setup();
      render(<RowActionsMenu user={makeFakeUser({ status: 'Blacklisted' })} />);

      await user.click(screen.getByRole('button', { name: /actions for/i }));

      expect(
        screen.getByRole('menuitem', { name: /blacklist user/i }),
      ).toBeDisabled();
    });

    it('disables Activate User when the user is already Active', async () => {
      const user = userEvent.setup();
      render(<RowActionsMenu user={makeFakeUser({ status: 'Active' })} />);

      await user.click(screen.getByRole('button', { name: /actions for/i }));

      expect(
        screen.getByRole('menuitem', { name: /activate user/i }),
      ).toBeDisabled();
    });
  });
});
