import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import styles from './UserDetailsSkeleton.module.scss';

export function UserDetailsSkeleton() {
  return (
    <div className={styles.root} aria-busy="true">
      <header className={styles.header}>
        <Skeleton width="100px" height="14px" />
        <Skeleton width="180px" height="28px" />
      </header>

      <div className={styles.summaryCard}>
        <Skeleton width="100px" height="100px" rounded="pill" />
        <div className={styles.summaryText}>
          <Skeleton width="220px" height="22px" />
          <Skeleton width="120px" height="14px" />
        </div>
      </div>

      <div className={styles.contentCard}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={styles.field}>
            <Skeleton width="80px" height="10px" />
            <Skeleton width="130px" height="14px" />
          </div>
        ))}
      </div>
    </div>
  );
}
