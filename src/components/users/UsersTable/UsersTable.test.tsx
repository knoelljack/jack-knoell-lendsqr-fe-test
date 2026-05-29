import { render, screen } from '@testing-library/react';
import { UsersTable } from './UsersTable';
import { makeFakeUser } from '@/test-utils/fakeUser';

describe('UsersTable', () => {
  describe('positive', () => {
    it('renders a row for each user with the expected columns', () => {
      const users = [
        makeFakeUser({ id: 'a', username: 'Alice', organization: 'Lendsqr' }),
        makeFakeUser({ id: 'b', username: 'Bob', organization: 'Irorun' }),
      ];

      render(<UsersTable users={users} />);

      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('Lendsqr')).toBeInTheDocument();
      expect(screen.getByText('Irorun')).toBeInTheDocument();
    });

    it('renders filter buttons when onFilterClick is provided', () => {
      render(
        <UsersTable
          users={[makeFakeUser()]}
          onFilterClick={() => {}}
        />,
      );
      expect(
        screen.getByRole('button', { name: /filter by organization/i }),
      ).toBeInTheDocument();
    });
  });

  describe('negative', () => {
    it('shows the empty message when the list is empty', () => {
      render(
        <UsersTable
          users={[]}
          emptyMessage="No users yet."
        />,
      );
      expect(screen.getByText('No users yet.')).toBeInTheDocument();
    });

    it('omits filter buttons when onFilterClick is not provided', () => {
      render(<UsersTable users={[makeFakeUser()]} />);
      expect(
        screen.queryByRole('button', { name: /filter by organization/i }),
      ).not.toBeInTheDocument();
    });
  });
});
