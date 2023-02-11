// middleware.ts
import { NextResponse } from 'next/server';

import appConfig from './config/App';

import type { NextRequest } from 'next/server';
import { AppRoutes } from './utils';
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const cookie = request.cookies.get(appConfig.NONCE_NAME);
  if (!cookie) {
    const url = request.nextUrl.clone();
    url.pathname = AppRoutes.SignIn;
    return NextResponse.redirect(url);
  }

  return response;
}
export const config = {
  matcher: ['/admin/:path*'],
};
