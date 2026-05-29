import cn from 'classnames';
import styles from './Icon.module.scss';

export type IconName =
  | 'activate-user'
  | 'audit-logs'
  | 'bell'
  | 'blacklist-user'
  | 'briefcase'
  | 'calendar'
  | 'card-active-users'
  | 'card-users'
  | 'card-users-with-loans'
  | 'card-users-with-savings'
  | 'caret-down'
  | 'chevron-down'
  | 'decision-models'
  | 'fees-and-charges'
  | 'fees-and-pricing'
  | 'filter'
  | 'guarantor'
  | 'home'
  | 'karma'
  | 'loan-requests'
  | 'loans'
  | 'preferences'
  | 'reports'
  | 'savings'
  | 'savings-products'
  | 'search'
  | 'service-account'
  | 'services'
  | 'settlements'
  | 'transactions'
  | 'users'
  | 'view'
  | 'whitelist';

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  alt?: string;
};

export function Icon({ name, size = 16, className, alt = '' }: IconProps) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`/icons/${name}.svg`}
      alt={alt}
      width={size}
      className={cn(styles.root, className)}
      aria-hidden={alt === '' ? true : undefined}
    />
  );
}
