'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { PasswordInput } from '@/components/ui/PasswordInput/PasswordInput';
import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  POST_LOGIN_ROUTE,
} from '@/constants/auth';
import styles from './LoginForm.module.scss';

export type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm({ onSubmit }: LoginFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
  });

  const submit = async (values: LoginFormValues) => {
    if (onSubmit) {
      await onSubmit(values);
      return;
    }
    document.cookie = `${AUTH_COOKIE_NAME}=1; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; SameSite=Lax`;
    router.push(POST_LOGIN_ROUTE);
  };

  return (
    <form
      noValidate
      className={styles.form}
      onSubmit={handleSubmit(submit)}
    >
      <Input
        type="email"
        placeholder="Email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email' },
        })}
      />
      <PasswordInput
        placeholder="Password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
      />
      <Link href="/forgot-password" className={styles.forgot}>
        Forgot password?
      </Link>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Logging in…' : 'Log in'}
      </Button>
    </form>
  );
}
