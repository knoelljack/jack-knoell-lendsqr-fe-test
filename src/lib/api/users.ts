import type {
  Organization,
  User,
  UserStatus,
  UsersListResponse,
} from '@/types/user';

export type UsersListQuery = {
  page?: number;
  perPage?: number;
  status?: UserStatus;
  organization?: Organization;
  username?: string;
  email?: string;
  phoneNumber?: string;
  dateJoined?: string;
  q?: string;
};

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function buildQuery(query: UsersListQuery): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  }
  const search = params.toString();
  return search ? `?${search}` : '';
}

export async function fetchUsers(
  query: UsersListQuery = {},
): Promise<UsersListResponse> {
  const response = await fetch(`/api/users${buildQuery(query)}`);
  if (!response.ok) {
    throw new ApiError(
      `Failed to load users (${response.status})`,
      response.status,
    );
  }
  return response.json() as Promise<UsersListResponse>;
}

export async function fetchUserById(id: string): Promise<User> {
  const response = await fetch(`/api/users/${encodeURIComponent(id)}`);
  if (response.status === 404) {
    throw new ApiError('User not found', 404);
  }
  if (!response.ok) {
    throw new ApiError(
      `Failed to load user (${response.status})`,
      response.status,
    );
  }
  return response.json() as Promise<User>;
}
