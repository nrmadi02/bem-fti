import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('next-auth.session-token')
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}