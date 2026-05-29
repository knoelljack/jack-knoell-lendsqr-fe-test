'use client';

import cn from 'classnames';
import type { User } from '@/types/user';
import styles from './UserSummaryCard.module.scss';

export const DETAILS_TABS = [
  { id: 'general-details', label: 'General Details' },
  { id: 'documents', label: 'Documents' },
  { id: 'bank-details', label: 'Bank Details' },
  { id: 'loans', label: 'Loans' },
  { id: 'savings', label: 'Savings' },
  { id: 'app-and-system', label: 'App and System' },
] as const;

export type DetailsTabId = (typeof DETAILS_TABS)[number]['id'];

type UserSummaryCardProps = {
  user: User;
  activeTab?: DetailsTabId;
  onTabChange?: (tab: DetailsTabId) => void;
};

const balanceFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2,
});

export function UserSummaryCard({
  user,
  activeTab = 'general-details',
  onTabChange,
}: UserSummaryCardProps) {
  return (
    <section className={styles.root}>
      <div className={styles.summary}>
        <div className={styles.identity}>
          <Avatar />
          <div className={styles.identityText}>
            <h2 className={styles.name}>{user.username}</h2>
            <p className={styles.userId}>{user.id.slice(0, 11)}</p>
          </div>
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.tier}>
          <p className={styles.tierLabel}>User&apos;s Tier</p>
          <TierStars tier={user.account.tier} />
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.bank}>
          <p className={styles.balance}>
            {balanceFormatter.format(user.account.balance)}
          </p>
          <p className={styles.bankInfo}>
            {user.account.accountNumber}/{user.account.bank}
          </p>
        </div>
      </div>

      <nav className={styles.tabs} aria-label="User details sections">
        <ul className={styles.tabList}>
          {DETAILS_TABS.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                className={cn(
                  styles.tab,
                  tab.id === activeTab && styles.tab_active,
                )}
                aria-current={tab.id === activeTab ? 'page' : undefined}
                onClick={() => onTabChange?.(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

function Avatar() {
  return (
    <div className={styles.avatar} aria-hidden="true">
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="20" r="8" fill="currentColor" />
        <path
          d="M10 42c0-8 7-13 15-13s15 5 15 13v3H10v-3z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function TierStars({ tier }: { tier: number }) {
  return (
    <div
      className={styles.stars}
      role="img"
      aria-label={`Tier ${tier} of 3`}
    >
      {[1, 2, 3].map((position) => (
        <Star key={position} filled={position <= tier} />
      ))}
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 1l2.09 4.26L14.8 6l-3.4 3.32.8 4.68L8 11.77 3.8 14l.8-4.68L1.2 6l4.71-.74L8 1z"
        fill={filled ? '#E9B200' : 'none'}
        stroke="#E9B200"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
