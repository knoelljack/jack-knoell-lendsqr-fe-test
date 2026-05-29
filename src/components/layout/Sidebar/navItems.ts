import type { IconName } from '@/components/ui/Icon/Icon';

export type NavItem = {
  label: string;
  href: string;
  icon: IconName;
};

export type NavGroup = {
  heading?: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    items: [{ label: 'Dashboard', href: '/dashboard', icon: 'home' }],
  },
  {
    heading: 'Customers',
    items: [
      { label: 'Users', href: '/users', icon: 'users' },
      { label: 'Guarantors', href: '/guarantors', icon: 'guarantor' },
      { label: 'Loans', href: '/loans', icon: 'loans' },
      {
        label: 'Decision Models',
        href: '/decision-models',
        icon: 'decision-models',
      },
      { label: 'Savings', href: '/savings', icon: 'savings' },
      {
        label: 'Loan Requests',
        href: '/loan-requests',
        icon: 'loan-requests',
      },
      { label: 'Whitelist', href: '/whitelist', icon: 'whitelist' },
      { label: 'Karma', href: '/karma', icon: 'karma' },
    ],
  },
  {
    heading: 'Businesses',
    items: [
      { label: 'Organization', href: '/organization', icon: 'briefcase' },
      {
        label: 'Loan Products',
        href: '/loan-products',
        icon: 'loan-requests',
      },
      {
        label: 'Savings Products',
        href: '/savings-products',
        icon: 'savings-products',
      },
      {
        label: 'Fees and Charges',
        href: '/fees-and-charges',
        icon: 'fees-and-charges',
      },
      { label: 'Transactions', href: '/transactions', icon: 'transactions' },
      { label: 'Services', href: '/services', icon: 'services' },
      {
        label: 'Service Account',
        href: '/service-account',
        icon: 'service-account',
      },
      { label: 'Settlements', href: '/settlements', icon: 'settlements' },
      { label: 'Reports', href: '/reports', icon: 'reports' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { label: 'Preferences', href: '/preferences', icon: 'preferences' },
      {
        label: 'Fees and Pricing',
        href: '/fees-and-pricing',
        icon: 'fees-and-pricing',
      },
      { label: 'Audit Logs', href: '/audit-logs', icon: 'audit-logs' },
    ],
  },
];
