import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  function renderPagination(props: Partial<React.ComponentProps<typeof Pagination>> = {}) {
    const onPageChange = jest.fn();
    const onPerPageChange = jest.fn();
    render(
      <Pagination
        page={1}
        perPage={10}
        total={100}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
        {...props}
      />,
    );
    return { onPageChange, onPerPageChange };
  }

  describe('positive', () => {
    it('calls onPageChange with the clicked page number', async () => {
      const user = userEvent.setup();
      const { onPageChange } = renderPagination({ page: 1, total: 100 });

      await user.click(screen.getByRole('button', { name: 'Go to page 2' }));

      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('marks the active page with aria-current', () => {
      renderPagination({ page: 4, total: 100 });

      expect(
        screen.getByRole('button', { name: 'Go to page 4' }),
      ).toHaveAttribute('aria-current', 'page');
    });

    it('calls onPerPageChange when the per-page select changes', async () => {
      const user = userEvent.setup();
      const { onPerPageChange } = renderPagination();

      await user.selectOptions(screen.getByLabelText(/results per page/i), '50');

      expect(onPerPageChange).toHaveBeenCalledWith(50);
    });
  });

  describe('negative', () => {
    it('disables previous button on the first page', () => {
      renderPagination({ page: 1, total: 100 });
      expect(
        screen.getByRole('button', { name: 'Previous page' }),
      ).toBeDisabled();
    });

    it('disables next button on the last page', () => {
      renderPagination({ page: 10, total: 100, perPage: 10 });
      expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
    });

    it('clamps an out-of-range page to the last available page', () => {
      renderPagination({ page: 999, total: 30, perPage: 10 });
      expect(
        screen.getByRole('button', { name: 'Go to page 3' }),
      ).toHaveAttribute('aria-current', 'page');
    });
  });
});
