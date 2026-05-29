'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon/Icon';
import type { User } from '@/types/user';
import styles from './RowActionsMenu.module.scss';

type RowActionsMenuProps = {
  user: User;
  onBlacklist?: (user: User) => void;
  onActivate?: (user: User) => void;
};

export function RowActionsMenu({
  user,
  onBlacklist,
  onActivate,
}: RowActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    function onClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const isBlacklisted = user.status === 'Blacklisted';
  const isActive = user.status === 'Active';

  return (
    <div ref={wrapperRef} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        aria-label={`Actions for ${user.username}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </button>

      {open ? (
        <div className={styles.menu} role="menu">
          <Link
            role="menuitem"
            className={styles.item}
            href={`/users/${encodeURIComponent(user.id)}`}
            onClick={() => setOpen(false)}
          >
            <Icon name="view" size={14} />
            <span>View Details</span>
          </Link>
          <button
            type="button"
            role="menuitem"
            className={styles.item}
            disabled={isBlacklisted}
            onClick={() => {
              setOpen(false);
              onBlacklist?.(user);
            }}
          >
            <Icon name="blacklist-user" size={14} />
            <span>Blacklist User</span>
          </button>
          <button
            type="button"
            role="menuitem"
            className={styles.item}
            disabled={isActive}
            onClick={() => {
              setOpen(false);
              onActivate?.(user);
            }}
          >
            <Icon name="activate-user" size={14} />
            <span>Activate User</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
