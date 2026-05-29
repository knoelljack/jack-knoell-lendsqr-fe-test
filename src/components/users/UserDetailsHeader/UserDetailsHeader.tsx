import Link from 'next/link';
import cn from 'classnames';
import type { User } from '@/types/user';
import styles from './UserDetailsHeader.module.scss';

type UserDetailsHeaderProps = {
  user: User;
  onBlacklist?: () => void;
  onActivate?: () => void;
};

export function UserDetailsHeader({
  user,
  onBlacklist,
  onActivate,
}: UserDetailsHeaderProps) {
  const isBlacklisted = user.status === 'Blacklisted';
  const isActive = user.status === 'Active';

  return (
    <header className={styles.root}>
      <Link href="/users" className={styles.backLink}>
        <BackArrow />
        <span>Back to Users</span>
      </Link>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>User Details</h1>
        <div className={styles.actions}>
          <button
            type="button"
            className={cn(styles.actionButton, styles.blacklistButton)}
            onClick={onBlacklist}
            disabled={isBlacklisted}
          >
            Blacklist User
          </button>
          <button
            type="button"
            className={cn(styles.actionButton, styles.activateButton)}
            onClick={onActivate}
            disabled={isActive}
          >
            Activate User
          </button>
        </div>
      </div>
    </header>
  );
}

function BackArrow() {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 1L1 6L5 11M1 6H19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
