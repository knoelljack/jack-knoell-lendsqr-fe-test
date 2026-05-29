'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { Icon } from '@/components/ui/Icon/Icon';
import { NAV_GROUPS, type NavGroup, type NavItem } from './navItems';
import styles from './Sidebar.module.scss';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.root} aria-label="Sidebar">
      <button
        type="button"
        className={styles.switchOrg}
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <Icon name="briefcase" />
        <span className={styles.switchOrgLabel}>Switch Organization</span>
        <Icon name="caret-down" size={14} />
      </button>

      <nav aria-label="Main navigation" className={styles.nav}>
        {NAV_GROUPS.map((group, idx) => (
          <SidebarGroup key={idx} group={group} pathname={pathname} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarGroup({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  return (
    <div className={styles.group}>
      {group.heading ? (
        <h2 className={styles.heading}>{group.heading}</h2>
      ) : null}
      <ul className={styles.list}>
        {group.items.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
            active={isActive(pathname, item.href)}
          />
        ))}
      </ul>
    </div>
  );
}

function SidebarItem({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <li>
      <Link
        href={item.href}
        className={cn(styles.item, active && styles.item_active)}
        aria-current={active ? 'page' : undefined}
      >
        <Icon name={item.icon} className={styles.itemIcon} />
        <span className={styles.itemLabel}>{item.label}</span>
      </Link>
    </li>
  );
}
