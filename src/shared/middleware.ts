import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PUBLIC_ROUTES } from '@/shared/constants/publicRoutes'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value

  const isPublic = PUBLIC_ROUTES.some(route =>
    req.nextUrl.pathname.startsWith(route)
  )

  if (!token && !isPublic) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/auth/login'
    loginUrl.searchParams.set('from', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
}
