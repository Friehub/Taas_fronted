import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
    ],
};

export default function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Security Check: Admin Auth Cookie
    const authCookie = req.cookies.get('admin-auth');
    const isLoginPage = url.pathname === '/login';

    if (!authCookie && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
