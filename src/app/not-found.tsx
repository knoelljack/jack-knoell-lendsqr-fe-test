import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './not-found.module.scss';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <main className={styles.root}>
      <div className={styles.content}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>We couldn&apos;t find that page</h1>
        <p className={styles.body}>
          The page you&apos;re looking for may have moved or no longer exists.
        </p>
        <Link className={styles.action} href="/dashboard">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
