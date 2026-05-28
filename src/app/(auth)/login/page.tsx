import type { Metadata } from 'next';
import { Logo } from '@/components/brand/Logo/Logo';
import { LoginForm } from './LoginForm';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className={styles.root}>
      <section className={styles.illustrationPane} aria-hidden="true">
        <header className={styles.logoBar}>
          <Logo width={145} />
        </header>
        <div className={styles.illustrationFrame}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/pablo-sign-in.svg"
            alt=""
            className={styles.illustration}
          />
        </div>
      </section>
      <section className={styles.formPane}>
        <header className={styles.mobileLogoBar}>
          <Logo width={120} />
        </header>
        <div className={styles.formContent}>
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
