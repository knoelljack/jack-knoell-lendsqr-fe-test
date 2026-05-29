'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import {
  ORGANIZATIONS,
  USER_STATUSES,
  type Organization,
  type UserStatus,
} from '@/types/user';
import styles from './FilterPanel.module.scss';

export type Filters = {
  organization?: Organization;
  username?: string;
  email?: string;
  dateJoined?: string;
  phoneNumber?: string;
  status?: UserStatus;
};

type FilterPanelProps = {
  initial?: Filters;
  onApply: (filters: Filters) => void;
  onReset: () => void;
};

export function FilterPanel({
  initial = {},
  onApply,
  onReset,
}: FilterPanelProps) {
  const [organization, setOrganization] = useState<string>(
    initial.organization ?? '',
  );
  const [username, setUsername] = useState(initial.username ?? '');
  const [email, setEmail] = useState(initial.email ?? '');
  const [dateJoined, setDateJoined] = useState(initial.dateJoined ?? '');
  const [phoneNumber, setPhoneNumber] = useState(initial.phoneNumber ?? '');
  const [status, setStatus] = useState<string>(initial.status ?? '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onApply({
      organization: (organization as Organization) || undefined,
      username: username.trim() || undefined,
      email: email.trim() || undefined,
      dateJoined: dateJoined || undefined,
      phoneNumber: phoneNumber.trim() || undefined,
      status: (status as UserStatus) || undefined,
    });
  };

  const handleReset = () => {
    setOrganization('');
    setUsername('');
    setEmail('');
    setDateJoined('');
    setPhoneNumber('');
    setStatus('');
    onReset();
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span className={styles.label}>Organization</span>
        <select
          className={styles.select}
          value={organization}
          onChange={(event) => setOrganization(event.target.value)}
        >
          <option value="">Select</option>
          {ORGANIZATIONS.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Username</span>
        <input
          type="text"
          className={styles.input}
          placeholder="User"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Email</span>
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Date</span>
        <div className={styles.dateWrap}>
          <input
            type="date"
            className={styles.input}
            value={dateJoined}
            onChange={(event) => setDateJoined(event.target.value)}
          />
          <Icon name="calendar" size={14} className={styles.dateIcon} />
        </div>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Phone Number</span>
        <input
          type="tel"
          className={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Status</span>
        <select
          className={styles.select}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">Select</option>
          {USER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="ghost"
          size="md"
          fullWidth
          onClick={handleReset}
          className={styles.resetButton}
        >
          Reset
        </Button>
        <Button type="submit" variant="primary" size="md" fullWidth>
          Filter
        </Button>
      </div>
    </form>
  );
}
