import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { User } from '@/types/user';

let cache: User[] | null = null;

export function loadUsers(): User[] {
  if (cache) return cache;
  const path = join(process.cwd(), 'fixtures', 'users.json');
  cache = JSON.parse(readFileSync(path, 'utf-8')) as User[];
  return cache;
}

export function findUserById(id: string): User | undefined {
  return loadUsers().find((u) => u.id === id);
}
