'use client';

import { useEffect, useState } from 'react';
import { Pagination } from '@/components/users/Pagination/Pagination';
import { StatCard } from '@/components/users/StatCard/StatCard';
import { UsersTable } from '@/components/users/UsersTable/UsersTable';
import { fetchUsers } from '@/lib/api/users';
import type { UsersListResponse, UsersStats } from '@/types/user';
import styles from './page.module.scss';

type UsersViewProps = {
  stats: UsersStats;
};

const STAT_CARDS = [
  {
    icon: 'card-users',
    iconAccent: '#DF18FF',
    label: 'Users',
    statKey: 'total',
  },
  {
    icon: 'card-active-users',
    iconAccent: '#5718FF',
    label: 'Active Users',
    statKey: 'active',
  },
  {
    icon: 'card-users-with-loans',
    iconAccent: '#F55F44',
    label: 'Users with Loans',
    statKey: 'withLoans',
  },
  {
    icon: 'card-users-with-savings',
    iconAccent: '#FF3366',
    label: 'Users with Savings',
    statKey: 'withSavings',
  },
] as const;

const INITIAL_PER_PAGE = 10;

export function UsersView({ stats }: UsersViewProps) {
  const [data, setData] = useState<UsersListResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    fetchUsers({ page, perPage })
      .then((response) => {
        if (!cancelled) setData(response);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [page, perPage]);

  const handlePerPageChange = (next: number) => {
    setPerPage(next);
    setPage(1);
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Users</h1>

      <section aria-label="User statistics" className={styles.statsGrid}>
        {STAT_CARDS.map((card) => (
          <StatCard
            key={card.statKey}
            icon={card.icon}
            iconAccent={card.iconAccent}
            label={card.label}
            value={stats[card.statKey]}
          />
        ))}
      </section>

      <section className={styles.tableSection}>
        {error ? (
          <p role="alert" className={styles.error}>
            Failed to load users: {error}
          </p>
        ) : !data ? (
          <p className={styles.loading}>Loading users…</p>
        ) : (
          <>
            <UsersTable users={data.users} />
            <Pagination
              page={data.page}
              perPage={data.perPage}
              total={data.total}
              onPageChange={setPage}
              onPerPageChange={handlePerPageChange}
            />
          </>
        )}
      </section>
    </div>
  );
}
