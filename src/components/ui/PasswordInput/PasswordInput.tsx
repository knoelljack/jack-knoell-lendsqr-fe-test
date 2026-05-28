'use client';

import { useState } from 'react';
import { Input } from '../Input/Input';
import styles from './PasswordInput.module.scss';

type PasswordInputProps = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'trailing'
>;

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-pressed={visible}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className={styles.toggle}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      }
    />
  );
}
