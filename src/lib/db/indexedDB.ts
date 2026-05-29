import { openDB, type IDBPDatabase } from 'idb';
import type { User, UserStatus } from '@/types/user';

const DB_NAME = 'lendsqr-admin';
const DB_VERSION = 1;
const STORE_USERS = 'users';

interface UsersDbSchema {
  users: {
    key: string;
    value: User;
  };
}

let dbPromise: Promise<IDBPDatabase<UsersDbSchema>> | null = null;
let useFallback = false;
const memoryStore = new Map<string, User>();

function isIDBAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return typeof window.indexedDB !== 'undefined' && window.indexedDB !== null;
  } catch {
    return false;
  }
}

async function getDb(): Promise<IDBPDatabase<UsersDbSchema> | null> {
  if (useFallback) return null;
  if (!isIDBAvailable()) {
    useFallback = true;
    return null;
  }
  if (!dbPromise) {
    try {
      dbPromise = openDB<UsersDbSchema>(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_USERS)) {
            db.createObjectStore(STORE_USERS, { keyPath: 'id' });
          }
        },
      });
    } catch {
      useFallback = true;
      return null;
    }
  }
  try {
    return await dbPromise;
  } catch {
    useFallback = true;
    dbPromise = null;
    return null;
  }
}

export async function saveUser(user: User): Promise<void> {
  const db = await getDb();
  if (db) {
    try {
      await db.put(STORE_USERS, user);
      return;
    } catch {
      useFallback = true;
    }
  }
  memoryStore.set(user.id, user);
}

export async function getUserFromDb(id: string): Promise<User | undefined> {
  const db = await getDb();
  if (db) {
    try {
      return await db.get(STORE_USERS, id);
    } catch {
      useFallback = true;
    }
  }
  return memoryStore.get(id);
}

export async function updateUserStatusInDb(
  id: string,
  status: UserStatus,
): Promise<User | undefined> {
  const existing = await getUserFromDb(id);
  if (!existing) return undefined;
  const updated: User = { ...existing, status };
  await saveUser(updated);
  return updated;
}

export function __resetForTests(): void {
  dbPromise = null;
  useFallback = false;
  memoryStore.clear();
}
