'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { UserDetailsHeader } from '@/components/users/UserDetailsHeader/UserDetailsHeader';
import { ApiError, fetchUserById } from '@/lib/api/users';
import { getUserFromDb } from '@/lib/db/indexedDB';
import type { User } from '@/types/user';
import styles from './page.module.scss';

type UserDetailsViewProps = {
  userId: string;
};

export function UserDetailsView({ userId }: UserDetailsViewProps) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const fromIdb = await getUserFromDb(userId);
        if (cancelled) return;
        if (fromIdb) {
          setUser(fromIdb);
          return;
        }
        const fromApi = await fetchUserById(userId);
        if (!cancelled) setUser(fromApi);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          notFound();
        }
        setError(err instanceof Error ? err.message : 'Failed to load user');
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (error) {
    return (
      <section className={styles.errorState} role="alert">
        <p>Failed to load user: {error}</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className={styles.loadingState} aria-busy="true">
        <p>Loading user details…</p>
      </section>
    );
  }

  return (
    <article className={styles.root}>
      <UserDetailsHeader user={user} />
    </article>
  );
}
