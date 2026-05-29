import { NextResponse, type NextRequest } from 'next/server';
import { findUserById } from '@/lib/server/usersDb';

type RouteParams = { id: string };

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<RouteParams> },
) {
  const { id } = await params;
  const user = findUserById(id);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}
