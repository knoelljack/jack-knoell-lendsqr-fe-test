import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RowActionsMenu } from '@/components/users/RowActionsMenu/RowActionsMenu';
import { UserDetailsView } from '@/app/(dashboard)/users/[id]/UserDetailsView';
import {
  __resetForTests,
  getUserFromDb,
  saveUser,
} from '@/lib/db/indexedDB';
import { makeFakeUser } from '@/test-utils/fakeUser';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
  usePathname: () => '/users',
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

beforeEach(() => {
  __resetForTests();
  fetchUserById.mockReset();
});

describe('Integration: View Details → IndexedDB → details hydration', () => {
  it('persists the user to IDB on View Details click and hydrates details from IDB on next render', async () => {
    const user = makeFakeUser({
      id: 'flow-hydrate',
      username: 'Flow User',
      status: 'Pending',
    });
    const userEvt = userEvent.setup();

    render(<RowActionsMenu user={user} />);
    await userEvt.click(
      screen.getByRole('button', { name: /actions for/i }),
    );
    await userEvt.click(
      screen.getByRole('menuitem', { name: /view details/i }),
    );

    await waitFor(async () => {
      const stored = await getUserFromDb('flow-hydrate');
      expect(stored?.username).toBe('Flow User');
    });

    cleanup();

    render(<UserDetailsView userId="flow-hydrate" />);

    expect(await screen.findByText('Flow User')).toBeInTheDocument();
    expect(fetchUserById).not.toHaveBeenCalled();
  });

  it('blacklisting on the details page persists across a second render', async () => {
    const user = makeFakeUser({
      id: 'flow-status',
      username: 'Status Flow',
      status: 'Pending',
    });
    await saveUser(user);
    const userEvt = userEvent.setup();

    render(<UserDetailsView userId="flow-status" />);
    await screen.findByText('Status Flow');

    await userEvt.click(
      screen.getByRole('button', { name: /blacklist user/i }),
    );

    await waitFor(async () => {
      const stored = await getUserFromDb('flow-status');
      expect(stored?.status).toBe('Blacklisted');
    });

    cleanup();

    render(<UserDetailsView userId="flow-status" />);
    await screen.findByText('Status Flow');

    expect(
      screen.getByRole('button', { name: /blacklist user/i }),
    ).toBeDisabled();
    expect(fetchUserById).not.toHaveBeenCalled();
  });
});
