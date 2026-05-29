'use client';

import Link from 'next/link';
import { Logo } from '@/components/brand/Logo/Logo';
import { Icon } from '@/components/ui/Icon/Icon';
import styles from './Topbar.module.scss';

type TopbarProps = {
  onMenuClick?: () => void;
};

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className={styles.root}>
      <div className={styles.leadingGroup}>
        {onMenuClick ? (
          <button
            type="button"
            className={styles.menuButton}
            onClick={onMenuClick}
            aria-label="Open navigation menu"
          >
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </button>
        ) : null}
        <Link href="/dashboard" className={styles.logoLink} aria-label="Lendsqr home">
          <Logo width={145} />
        </Link>
      </div>

      <form
        role="search"
        className={styles.search}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="search"
          placeholder="Search for anything"
          aria-label="Search"
          className={styles.searchInput}
        />
        <button
          type="submit"
          className={styles.searchButton}
          aria-label="Submit search"
        >
          <Icon name="search" size={14} />
        </button>
      </form>

      <div className={styles.trailingGroup}>
        <Link href="/docs" className={styles.docsLink}>
          Docs
        </Link>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Notifications"
        >
          <Icon name="bell" size={20} />
        </button>
        <button
          type="button"
          className={styles.profile}
          aria-haspopup="menu"
          aria-expanded="false"
        >
          <span className={styles.avatar} aria-hidden="true">
            A
          </span>
          <span className={styles.profileName}>Adedeji</span>
          <Icon name="chevron-down" size={20} />
        </button>
      </div>
    </header>
  );
}
