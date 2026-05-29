import cn from 'classnames';
import type { CSSProperties } from 'react';
import styles from './Skeleton.module.scss';

type SkeletonProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'sm' | 'md' | 'pill';
};

export function Skeleton({
  className,
  width,
  height,
  rounded = 'sm',
}: SkeletonProps) {
  const style: CSSProperties = {
    width,
    height,
  };
  return (
    <span
      aria-hidden="true"
      className={cn(styles.root, styles[`rounded_${rounded}`], className)}
      style={style}
    />
  );
}
