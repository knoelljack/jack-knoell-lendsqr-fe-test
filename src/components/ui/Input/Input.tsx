import cn from 'classnames';
import { useId } from 'react';
import styles from './Input.module.scss';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string;
  error?: string;
  trailing?: React.ReactNode;
  containerClassName?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export function Input({
  label,
  error,
  trailing,
  containerClassName,
  className,
  id,
  ref,
  ...inputProps
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={cn(styles.root, containerClassName)}>
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div className={cn(styles.field, error && styles.field_invalid)}>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(styles.input, className)}
          {...inputProps}
        />
        {trailing ? <div className={styles.trailing}>{trailing}</div> : null}
      </div>
      {error ? (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
