import { makeFakeUser } from '@/test-utils/fakeUser';
import {
  __resetForTests,
  getUserFromDb,
  saveUser,
  updateUserStatusInDb,
} from './indexedDB';

describe('IndexedDB wrapper', () => {
  beforeEach(() => {
    __resetForTests();
  });

  describe('positive', () => {
    it('round-trips a saved user', async () => {
      const user = makeFakeUser({ id: 'rt-1', username: 'Round Trip' });
      await saveUser(user);
      const result = await getUserFromDb('rt-1');
      expect(result?.username).toBe('Round Trip');
    });

    it('updates a stored user status', async () => {
      const user = makeFakeUser({ id: 'st-1', status: 'Pending' });
      await saveUser(user);
      const updated = await updateUserStatusInDb('st-1', 'Active');
      expect(updated?.status).toBe('Active');
      const refetched = await getUserFromDb('st-1');
      expect(refetched?.status).toBe('Active');
    });
  });

  describe('negative', () => {
    it('returns undefined for a missing key', async () => {
      const result = await getUserFromDb('does-not-exist');
      expect(result).toBeUndefined();
    });

    it('returns undefined when trying to update a missing user', async () => {
      const updated = await updateUserStatusInDb(
        'does-not-exist',
        'Blacklisted',
      );
      expect(updated).toBeUndefined();
    });

    it('falls back to in-memory when IndexedDB is unavailable', async () => {
      const realIDB = globalThis.indexedDB;
      // @ts-expect-error - simulating IDB being unavailable
      globalThis.indexedDB = undefined;
      __resetForTests();

      const user = makeFakeUser({ id: 'fb-1', username: 'Fallback' });
      await saveUser(user);
      const result = await getUserFromDb('fb-1');
      expect(result?.username).toBe('Fallback');

      globalThis.indexedDB = realIDB;
    });
  });
});
