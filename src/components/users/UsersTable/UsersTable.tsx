import { StatusBadge } from '@/components/users/StatusBadge/StatusBadge';
import type { User } from '@/types/user';
import styles from './UsersTable.module.scss';

type UsersTableProps = {
  users: User[];
  emptyMessage?: string;
};

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

function formatJoined(iso: string): string {
  const date = new Date(iso);
  return `${DATE_FORMATTER.format(date)} ${TIME_FORMATTER.format(date)}`;
}

const COLUMNS = [
  'Organization',
  'Username',
  'Email',
  'Phone Number',
  'Date Joined',
  'Status',
] as const;

export function UsersTable({
  users,
  emptyMessage = 'No users match the current filters.',
}: UsersTableProps) {
  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <caption className={styles.caption}>Users</caption>
        <thead className={styles.head}>
          <tr>
            {COLUMNS.map((label) => (
              <th key={label} scope="col" className={styles.th}>
                {label}
              </th>
            ))}
            <th
              scope="col"
              aria-label="Row actions"
              className={styles.thActions}
            />
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length + 1} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className={styles.row}>
                <td className={styles.cell}>{user.organization}</td>
                <td className={styles.cell}>{user.username}</td>
                <td className={styles.cell}>{user.email}</td>
                <td className={styles.cell}>{user.phoneNumber}</td>
                <td className={styles.cell}>{formatJoined(user.dateJoined)}</td>
                <td className={styles.cell}>
                  <StatusBadge status={user.status} />
                </td>
                <td className={styles.cellActions} />
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
