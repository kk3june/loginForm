import { NextRequest, NextResponse } from 'next/server';

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  '/login': true,
  '/sms': true,
  '/create-account': true,
};

const protectedUrls: Routes = {
  '/': true,
  '/products': true,
  '/tweets': true,
  '/profile': true,
  // 다른 보호된 경로들...
};

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('tweet-user');
  const pathname = request.nextUrl.pathname;

  // 로그인하지 않은 경우
  if (!sessionCookie?.value) {
    if (protectedUrls[pathname]) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  // 로그인한 경우
  else {
    if (publicOnlyUrls[pathname]) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
