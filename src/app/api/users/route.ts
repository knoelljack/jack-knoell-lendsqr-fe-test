import { NextResponse, type NextRequest } from 'next/server';
import { loadUsers } from '@/lib/server/usersDb';
import {
  USER_STATUSES,
  ORGANIZATIONS,
  type Organization,
  type User,
  type UserStatus,
  type UsersListResponse,
} from '@/types/user';

const DEFAULT_PER_PAGE = 10;
const MAX_PER_PAGE = 100;

function parsePositiveInt(value: string | null, fallback: number): number {
  const parsed = value ? Number.parseInt(value, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function matchesQuery(user: User, query: string): boolean {
  const q = query.toLowerCase();
  return (
    user.username.toLowerCase().includes(q) ||
    user.email.toLowerCase().includes(q) ||
    user.phoneNumber.includes(query) ||
    user.organization.toLowerCase().includes(q)
  );
}

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const page = parsePositiveInt(params.get('page'), 1);
  const perPage = Math.min(
    parsePositiveInt(params.get('perPage'), DEFAULT_PER_PAGE),
    MAX_PER_PAGE,
  );

  const statusParam = params.get('status');
  const status = (USER_STATUSES as string[]).includes(statusParam ?? '')
    ? (statusParam as UserStatus)
    : undefined;

  const organizationParam = params.get('organization');
  const organization = (ORGANIZATIONS as string[]).includes(
    organizationParam ?? '',
  )
    ? (organizationParam as Organization)
    : undefined;

  const username = params.get('username')?.trim().toLowerCase();
  const email = params.get('email')?.trim().toLowerCase();
  const phoneNumber = params.get('phoneNumber')?.trim();
  const dateJoined = params.get('dateJoined');
  const query = params.get('q')?.trim();

  let filtered = loadUsers();

  if (status) filtered = filtered.filter((u) => u.status === status);
  if (organization)
    filtered = filtered.filter((u) => u.organization === organization);
  if (username)
    filtered = filtered.filter((u) =>
      u.username.toLowerCase().includes(username),
    );
  if (email)
    filtered = filtered.filter((u) => u.email.toLowerCase().includes(email));
  if (phoneNumber)
    filtered = filtered.filter((u) => u.phoneNumber.includes(phoneNumber));
  if (dateJoined)
    filtered = filtered.filter((u) =>
      u.dateJoined.startsWith(dateJoined.slice(0, 10)),
    );
  if (query) filtered = filtered.filter((u) => matchesQuery(u, query));

  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  const response: UsersListResponse = {
    users: paginated,
    total,
    page,
    perPage,
  };

  return NextResponse.json(response);
}
