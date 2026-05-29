import cn from 'classnames';
import styles from './EmptyState.module.scss';

type EmptyStateProps = {
  title: string;
  body?: string;
  className?: string;
};

export function EmptyState({ title, body, className }: EmptyStateProps) {
  return (
    <section className={cn(styles.root, className)}>
      <h2 className={styles.title}>{title}</h2>
      {body ? <p className={styles.body}>{body}</p> : null}
    </section>
  );
}
