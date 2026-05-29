'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { EmptyState } from '@/components/ui/EmptyState/EmptyState';
import { GeneralDetailsPanel } from '@/components/users/GeneralDetailsPanel/GeneralDetailsPanel';
import { UserDetailsHeader } from '@/components/users/UserDetailsHeader/UserDetailsHeader';
import {
  DETAILS_TABS,
  UserSummaryCard,
  type DetailsTabId,
} from '@/components/users/UserSummaryCard/UserSummaryCard';
import { ApiError, fetchUserById } from '@/lib/api/users';
import { getUserFromDb, saveUser } from '@/lib/db/indexedDB';
import type { User, UserStatus } from '@/types/user';
import styles from './page.module.scss';

type UserDetailsViewProps = {
  userId: string;
};

export function UserDetailsView({ userId }: UserDetailsViewProps) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DetailsTabId>('general-details');

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

  const updateStatus = async (status: UserStatus) => {
    const updated: User = { ...user, status };
    setUser(updated);
    await saveUser(updated);
  };

  return (
    <article className={styles.root}>
      <UserDetailsHeader
        user={user}
        onBlacklist={() => void updateStatus('Blacklisted')}
        onActivate={() => void updateStatus('Active')}
      />
      <UserSummaryCard
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === 'general-details' ? (
        <GeneralDetailsPanel user={user} />
      ) : (
        <EmptyState
          title={DETAILS_TABS.find((tab) => tab.id === activeTab)?.label ?? ''}
          body="This section is out of scope for the assessment."
        />
      )}
    </article>
  );
}
