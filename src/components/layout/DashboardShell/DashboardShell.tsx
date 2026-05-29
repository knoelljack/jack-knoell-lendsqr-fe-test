'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { Topbar } from '@/components/layout/Topbar/Topbar';
import styles from './DashboardShell.module.scss';

type DashboardShellProps = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setDrawerOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  return (
    <div className={styles.root}>
      <Topbar onMenuClick={() => setDrawerOpen(true)} />
      <div className={styles.body}>
        {drawerOpen ? (
          <div
            data-testid="drawer-backdrop"
            className={styles.backdrop}
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
        ) : null}
        <div
          className={cn(
            styles.sidebarWrap,
            drawerOpen && styles.sidebarWrap_open,
          )}
        >
          <Sidebar />
        </div>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
