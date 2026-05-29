import cn from 'classnames';
import type { UserStatus } from '@/types/user';
import styles from './StatusBadge.module.scss';

type StatusBadgeProps = {
  status: UserStatus | string;
  className?: string;
};

type BadgeVariant = 'active' | 'inactive' | 'pending' | 'blacklisted' | 'neutral';

const VARIANT_BY_STATUS: Record<UserStatus, BadgeVariant> = {
  Active: 'active',
  Inactive: 'inactive',
  Pending: 'pending',
  Blacklisted: 'blacklisted',
};

function variantFor(status: string): BadgeVariant {
  return VARIANT_BY_STATUS[status as UserStatus] ?? 'neutral';
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = variantFor(status);
  return (
    <span
      data-variant={variant}
      className={cn(styles.root, styles[`variant_${variant}`], className)}
    >
      {status}
    </span>
  );
}
