import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserDetailsView } from './UserDetailsView';
import { ApiError } from '@/lib/api/users';
import { __resetForTests, getUserFromDb, saveUser } from '@/lib/db/indexedDB';
import { makeFakeUser } from '@/test-utils/fakeUser';

const notFoundMock = jest.fn();
jest.mock('next/navigation', () => ({
  notFound: () => notFoundMock(),
}));

jest.mock('@/lib/api/users', () => {
  const actual = jest.requireActual('@/lib/api/users');
  return {
    ...actual,
    fetchUserById: jest.fn(),
  };
});

const { fetchUserById } = jest.requireMock('@/lib/api/users') as {
  fetchUserById: jest.Mock;
};

beforeEach(async () => {
  __resetForTests();
  notFoundMock.mockReset();
  fetchUserById.mockReset();
});

describe('UserDetailsView', () => {
  describe('positive', () => {
    it('hydrates from IndexedDB when the user is cached there', async () => {
      const user = makeFakeUser({ id: 'cached', username: 'Cached User' });
      await saveUser(user);

      render(<UserDetailsView userId="cached" />);

      expect(await screen.findByText('Cached User')).toBeInTheDocument();
      expect(fetchUserById).not.toHaveBeenCalled();
    });

    it('falls back to the API when IDB has no record', async () => {
      const user = makeFakeUser({ id: 'from-api', username: 'API User' });
      fetchUserById.mockResolvedValueOnce(user);

      render(<UserDetailsView userId="from-api" />);

      expect(await screen.findByText('API User')).toBeInTheDocument();
      expect(fetchUserById).toHaveBeenCalledWith('from-api');
    });

    it('persists status change to IndexedDB when Blacklist is clicked', async () => {
      const user = makeFakeUser({
        id: 'sa-1',
        username: 'Status User',
        status: 'Pending',
      });
      await saveUser(user);
      const userClick = userEvent.setup();

      render(<UserDetailsView userId="sa-1" />);
      await screen.findByText('Status User');

      await userClick.click(
        screen.getByRole('button', { name: /blacklist user/i }),
      );

      await waitFor(async () => {
        const stored = await getUserFromDb('sa-1');
        expect(stored?.status).toBe('Blacklisted');
      });
    });
  });

  describe('negative', () => {
    it('triggers notFound when the API returns a 404', async () => {
      fetchUserById.mockRejectedValueOnce(new ApiError('Not found', 404));

      render(<UserDetailsView userId="missing" />);

      await waitFor(() => {
        expect(notFoundMock).toHaveBeenCalled();
      });
    });

    it('surfaces an inline error for non-404 API failures', async () => {
      fetchUserById.mockRejectedValueOnce(new ApiError('Boom', 500));

      render(<UserDetailsView userId="broken" />);

      expect(
        await screen.findByText(/failed to load user.*boom/i),
      ).toBeInTheDocument();
      expect(notFoundMock).not.toHaveBeenCalled();
    });
  });
});
