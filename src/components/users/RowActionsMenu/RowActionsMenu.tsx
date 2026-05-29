'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon/Icon';
import type { User } from '@/types/user';
import styles from './RowActionsMenu.module.scss';

type RowActionsMenuProps = {
  user: User;
  onBlacklist?: (user: User) => void;
  onActivate?: (user: User) => void;
};

type Position = { top: number; left: number };

const MENU_WIDTH = 180;
const MENU_OFFSET = 8;

export function RowActionsMenu({
  user,
  onBlacklist,
  onActivate,
}: RowActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    function updatePosition() {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + MENU_OFFSET,
        left: rect.right + window.scrollX - MENU_WIDTH,
      });
    }
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    function onClick(event: MouseEvent) {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
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
    <>
      <button
        ref={triggerRef}
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

      {open && mounted
        ? createPortal(
            <div
              ref={menuRef}
              className={styles.menu}
              role="menu"
              style={{ top: position.top, left: position.left }}
            >
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
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
