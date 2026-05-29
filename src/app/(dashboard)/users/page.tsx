import type { Metadata } from 'next';
import { loadUsers } from '@/lib/server/usersDb';
import { computeStats } from '@/lib/server/usersStats';
import { UsersView } from './UsersView';

export const metadata: Metadata = {
  title: 'Users',
};

export default function UsersPage() {
  const stats = computeStats(loadUsers());
  return <UsersView stats={stats} />;
}
