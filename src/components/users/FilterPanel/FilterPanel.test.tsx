import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterPanel } from './FilterPanel';

describe('FilterPanel', () => {
  describe('positive', () => {
    it('calls onApply with the populated filters when Filter is submitted', async () => {
      const user = userEvent.setup();
      const onApply = jest.fn();
      const onReset = jest.fn();
      render(<FilterPanel onApply={onApply} onReset={onReset} />);

      await user.selectOptions(screen.getByLabelText('Organization'), 'Lendsqr');
      await user.type(screen.getByLabelText('Username'), 'jane');
      await user.selectOptions(screen.getByLabelText('Status'), 'Active');
      await user.click(screen.getByRole('button', { name: 'Filter' }));

      expect(onApply).toHaveBeenCalledWith(
        expect.objectContaining({
          organization: 'Lendsqr',
          username: 'jane',
          status: 'Active',
        }),
      );
    });

    it('hydrates the initial filter values', () => {
      render(
        <FilterPanel
          initial={{ organization: 'Irorun', email: 'a@b.com' }}
          onApply={() => {}}
          onReset={() => {}}
        />,
      );
      expect(screen.getByLabelText('Organization')).toHaveValue('Irorun');
      expect(screen.getByLabelText('Email')).toHaveValue('a@b.com');
    });
  });

  describe('negative', () => {
    it('drops empty fields so onApply receives only the filled values', async () => {
      const user = userEvent.setup();
      const onApply = jest.fn();
      render(<FilterPanel onApply={onApply} onReset={() => {}} />);

      await user.type(screen.getByLabelText('Username'), 'jane');
      await user.click(screen.getByRole('button', { name: 'Filter' }));

      const filters = onApply.mock.calls[0][0];
      expect(filters.username).toBe('jane');
      expect(filters.email).toBeUndefined();
      expect(filters.organization).toBeUndefined();
    });

    it('clears all fields and calls onReset when Reset is clicked', async () => {
      const user = userEvent.setup();
      const onReset = jest.fn();
      render(
        <FilterPanel
          initial={{ username: 'jane', email: 'jane@x.com' }}
          onApply={() => {}}
          onReset={onReset}
        />,
      );

      await user.click(screen.getByRole('button', { name: 'Reset' }));

      expect(screen.getByLabelText('Username')).toHaveValue('');
      expect(screen.getByLabelText('Email')).toHaveValue('');
      expect(onReset).toHaveBeenCalled();
    });
  });
});
