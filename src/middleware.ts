import { withAuth } from 'next-auth/middleware'
import { cookiesOptions } from './app/api/auth/[...nextauth]/cookieOptions'

export default withAuth(
  async function middleware() {
    // if (
    //   req.nextUrl.pathname.startsWith('/admin') &&
    //   !req.nextauth.token?.name?.includes('PROCESSO_SELETIVO_ADMIN')
    // ) {
    //   return NextResponse.redirect(
    //     new URL(process.env.PATH_PREFIX ?? '/', req.url),
    //   )
    // }
  },
  {
    cookies: cookiesOptions,
    callbacks: {
      authorized: ({ req, token }) => {
        if (
          !(
            req.nextUrl.pathname === '/auth/signin' ||
            req.nextUrl.pathname === '/api/auth/callback/keycloak' ||
            req.nextUrl.pathname === '/auth/signout'
          ) &&
          token?.error === 'RefreshAccessTokenError'
        ) {
          return false
        } else if (
          token === null &&
          req.nextUrl.pathname.startsWith('/') &&
          !(
            req.nextUrl.pathname === '/auth/signin' ||
            req.nextUrl.pathname === '/api/auth/callback/keycloak' ||
            req.nextUrl.pathname === '/auth/signout'
          )
        ) {
          req.nextUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
          return false
        }
        return true
      },
    },
  },
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|arboria).*)',
  ],
}
