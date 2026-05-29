import cn from 'classnames';
import styles from './Icon.module.scss';

export type IconName =
  | 'audit-logs'
  | 'bell'
  | 'briefcase'
  | 'chevron-down'
  | 'decision-models'
  | 'fees-and-charges'
  | 'fees-and-pricing'
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
