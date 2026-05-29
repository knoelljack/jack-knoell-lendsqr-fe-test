import { ApiError, fetchUserById, fetchUsers } from './users';
import { makeFakeUser } from '@/test-utils/fakeUser';

const fetchMock = jest.fn();
const originalFetch = globalThis.fetch;

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).fetch = fetchMock;
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

beforeEach(() => {
  fetchMock.mockReset();
});

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

describe('users API client', () => {
  describe('fetchUsers', () => {
    describe('positive', () => {
      it('returns the parsed list response on success', async () => {
        fetchMock.mockResolvedValueOnce(
          jsonResponse({
            users: [makeFakeUser({ id: 'u-1' })],
            total: 1,
            page: 1,
            perPage: 10,
          }),
        );

        const result = await fetchUsers({ page: 1, perPage: 10 });

        expect(result.total).toBe(1);
        expect(result.users[0].id).toBe('u-1');
      });

      it('serializes filters into the query string', async () => {
        fetchMock.mockResolvedValueOnce(
          jsonResponse({ users: [], total: 0, page: 1, perPage: 10 }),
        );

        await fetchUsers({ page: 2, status: 'Active', q: 'jane' });

        const calledWith = fetchMock.mock.calls[0][0] as string;
        expect(calledWith).toContain('page=2');
        expect(calledWith).toContain('status=Active');
        expect(calledWith).toContain('q=jane');
      });

      it('drops empty filter values from the query string', async () => {
        fetchMock.mockResolvedValueOnce(
          jsonResponse({ users: [], total: 0, page: 1, perPage: 10 }),
        );

        await fetchUsers({ username: '', email: undefined, page: 1 });

        const calledWith = fetchMock.mock.calls[0][0] as string;
        expect(calledWith).not.toContain('username=');
        expect(calledWith).not.toContain('email=');
      });
    });

    describe('negative', () => {
      it('throws ApiError when the response is not ok', async () => {
        fetchMock.mockResolvedValueOnce(jsonResponse(null, 500));

        await expect(fetchUsers()).rejects.toBeInstanceOf(ApiError);
      });
    });
  });

  describe('fetchUserById', () => {
    describe('positive', () => {
      it('returns the user on success', async () => {
        const user = makeFakeUser({ id: 'abc' });
        fetchMock.mockResolvedValueOnce(jsonResponse(user));

        const result = await fetchUserById('abc');

        expect(result.id).toBe('abc');
      });
    });

    describe('negative', () => {
      it('throws ApiError(404) when the user is not found', async () => {
        fetchMock.mockResolvedValueOnce(jsonResponse(null, 404));

        await expect(fetchUserById('missing')).rejects.toMatchObject({
          name: 'ApiError',
          status: 404,
        });
      });

      it('throws ApiError on other failures', async () => {
        fetchMock.mockResolvedValueOnce(jsonResponse(null, 500));

        await expect(fetchUserById('x')).rejects.toBeInstanceOf(ApiError);
      });
    });
  });
});
