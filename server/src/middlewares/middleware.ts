/*import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth'; // your custom JWT verify logic

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  const publicPaths = ['/', '/login', '/register'];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for token
  const token = request.cookies.get('token')?.value;

  if (!token || !verifyToken(token)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname); // Optional: preserve origin
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/profile/:path*'], // secured routes
};
*/