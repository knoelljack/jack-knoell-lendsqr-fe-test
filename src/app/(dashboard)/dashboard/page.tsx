import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>Welcome, Adedeji</h1>
      <p className={styles.subtitle}>
        This is the dashboard landing page. The main admin surface for the
        assessment lives on the{' '}
        <Link href="/users" className={styles.link}>
          Users
        </Link>{' '}
        screen.
      </p>
    </section>
  );
}
