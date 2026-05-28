import { NextResponse, type NextRequest } from 'next/server';
import {
  AUTH_COOKIE_NAME,
  LOGIN_ROUTE,
  POST_LOGIN_ROUTE,
} from '@/constants/auth';

export function proxy(request: NextRequest) {
  const isAuthed = request.cookies.has(AUTH_COOKIE_NAME);
  const { pathname } = request.nextUrl;

  if (!isAuthed && pathname !== LOGIN_ROUTE) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_ROUTE;
    return NextResponse.redirect(url);
  }

  if (isAuthed && pathname === LOGIN_ROUTE) {
    const url = request.nextUrl.clone();
    url.pathname = POST_LOGIN_ROUTE;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/users/:path*', '/login'],
};
