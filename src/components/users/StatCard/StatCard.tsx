import type { CSSProperties } from 'react';
import { Icon, type IconName } from '@/components/ui/Icon/Icon';
import styles from './StatCard.module.scss';

type StatCardProps = {
  icon: IconName;
  iconAccent: string;
  label: string;
  value: number;
};

const numberFormatter = new Intl.NumberFormat('en-US');

export function StatCard({ icon, iconAccent, label, value }: StatCardProps) {
  const accentStyle = { '--accent': iconAccent } as CSSProperties;
  return (
    <article className={styles.root}>
      <div className={styles.iconWrap} style={accentStyle}>
        <Icon name={icon} size={22} />
      </div>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{numberFormatter.format(value)}</p>
    </article>
  );
}
