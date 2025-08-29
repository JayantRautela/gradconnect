import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*', '/feed'],
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (token?.role === "ALUMNI" && token.alumni?.isVerified === false) {
        return NextResponse.redirect(new URL('/wait', request.url));
    }

    if (
    token &&
    (url.pathname.startsWith('/student/sign-in') ||
        url.pathname.startsWith('/student/sign-up') ||
        url.pathname.startsWith('/alumni/sign-up') ||
        url.pathname.startsWith('/student/verify') ||
        url.pathname === '/')
    ) {
        return NextResponse.redirect(new URL('/feed', request.url));
    }

    if (!token && (url.pathname.startsWith('/admin/dashboard') || url.pathname.startsWith('/feed'))) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}