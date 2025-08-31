import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*', '/feed', '/api/admin/:path*',    // 🔒 Protect all admin APIs
    '/admin/dashboard/:path*'],
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (token?.role === "ALUMNI" && token.alumni?.isVerified === false) {
        return NextResponse.redirect(new URL('/wait', request.url));
    }
    if (token?.role === "STUDENT" && token?.student?.isVerified === false) {
        return NextResponse.redirect(new URL('/student/verify', request.url));
    }

    if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/student/sign-up') ||
        url.pathname.startsWith('/alumni/sign-up') ||
        url.pathname.startsWith('/student/verify') ||
        url.pathname.startsWith('/admin/sign-up') ||
        url.pathname === '/')
    ) {
        return NextResponse.redirect(new URL('/feed', request.url));
    }

    if (!token && (
        url.pathname.startsWith('/admin/dashboard') || 
        url.pathname.startsWith('/feed') ||
        url.pathname.startsWith('/student/dashboard') ||  
        url.pathname.startsWith('/alumni/dashboard') 
    )) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (url.pathname.startsWith('/api/admin') && (!url.pathname.startsWith('/api/admin/sign-up'))) {
    if (!token || token.role !== "ADMIN") {
            return NextResponse.json({ 
                    success: false, 
                    message: "Unauthorized" 
                },
                { 
                    status: 401 
            });
        }
    }


    if (url.pathname.startsWith('/admin/dashboard')) {
        if (!token || token.role !== "ADMIN") {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    }

    return NextResponse.next();
}