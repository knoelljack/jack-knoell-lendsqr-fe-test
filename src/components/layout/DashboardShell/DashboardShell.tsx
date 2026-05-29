'use client';

import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { Topbar } from '@/components/layout/Topbar/Topbar';
import styles from './DashboardShell.module.scss';

type DashboardShellProps = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className={styles.root}>
      <Topbar />
      <div className={styles.body}>
        <div className={styles.sidebarWrap}>
          <Sidebar />
        </div>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
