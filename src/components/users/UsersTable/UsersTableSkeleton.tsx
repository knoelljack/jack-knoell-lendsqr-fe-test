import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import styles from './UsersTable.module.scss';

const COLUMN_LABELS = [
  'Organization',
  'Username',
  'Email',
  'Phone Number',
  'Date Joined',
  'Status',
];

const CELL_WIDTHS = ['70%', '80%', '90%', '60%', '80%'];

type UsersTableSkeletonProps = {
  rows?: number;
};

export function UsersTableSkeleton({ rows = 10 }: UsersTableSkeletonProps) {
  return (
    <div className={styles.scroll} aria-busy="true">
      <table className={styles.table}>
        <caption className={styles.caption}>Users loading…</caption>
        <thead className={styles.head}>
          <tr>
            {COLUMN_LABELS.map((label) => (
              <th key={label} scope="col" className={styles.th}>
                {label}
              </th>
            ))}
            <th
              scope="col"
              aria-hidden="true"
              className={styles.thActions}
            />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex} className={styles.row}>
              {CELL_WIDTHS.map((width, cellIndex) => (
                <td key={cellIndex} className={styles.cell}>
                  <Skeleton width={width} height="14px" />
                </td>
              ))}
              <td className={styles.cell}>
                <Skeleton width="60px" height="22px" rounded="pill" />
              </td>
              <td className={styles.cellActions} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
