'use client';

import { Button } from '@/components/ui/Button/Button';
import styles from './error.module.scss';

type UsersErrorProps = {
  error: Error;
  reset: () => void;
};

export default function UsersError({ error, reset }: UsersErrorProps) {
  return (
    <section className={styles.root} role="alert">
      <h1 className={styles.title}>Something went wrong loading users</h1>
      <p className={styles.message}>{error.message}</p>
      <Button onClick={reset} variant="primary" size="md">
        Try again
      </Button>
    </section>
  );
}
