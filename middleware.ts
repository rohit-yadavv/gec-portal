import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/sign-in' || path === '/adminRegister';

  const token = request.cookies.get('token')?.value || '';

  if (!isPublicPath && !token && !path.startsWith('/api/')) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }

  // Redirect to home if the user is already authenticated and tries to access a public path
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/", 
  ],
};
