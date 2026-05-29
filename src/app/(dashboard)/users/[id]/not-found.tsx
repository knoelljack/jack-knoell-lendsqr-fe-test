import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from './not-found.module.scss';

export default function UserNotFound() {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>User not found</h1>
      <p className={styles.body}>
        The user you&apos;re looking for doesn&apos;t exist or may have been
        removed from this organization.
      </p>
      <Link href="/users">
        <Button variant="primary" size="md">
          Back to Users
        </Button>
      </Link>
    </section>
  );
}
