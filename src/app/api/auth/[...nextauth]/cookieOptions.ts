import { CookiesOptions } from 'next-auth'

const cookiePrefix = 'scpc'

const secured = process.env.NEXTAUTH_URL?.startsWith('https')
export const cookiesOptions: Partial<CookiesOptions> = {
  sessionToken: {
    name: `__${cookiePrefix}_Secure-next-auth.session-token`,
    options: {
      httpOnly: secured,
      sameSite: 'lax',
      path: '/',
      secure: secured,
    },
  },
  callbackUrl: {
    name: `__${cookiePrefix}_Secure-next-auth.callback-url`,
    options: {
      sameSite: 'lax',
      path: '/',
      secure: secured,
    },
  },
  csrfToken: {
    name: `__${cookiePrefix}_Host-next-auth.csrf-token`,
    options: {
      httpOnly: secured,
      sameSite: 'lax',
      path: '/',
      secure: secured,
    },
  },
  pkceCodeVerifier: {
    name: `__${cookiePrefix}_next-auth.pkce.code_verifier`,
    options: {
      httpOnly: secured,
      sameSite: 'lax',
      path: '/',
      secure: secured,
      maxAge: 900,
    },
  },
  state: {
    name: `__${cookiePrefix}_next-auth.state`,
    options: {
      httpOnly: secured,
      sameSite: 'lax',
      path: '/',
      secure: secured,
      maxAge: 900,
    },
  },
  nonce: {
    name: `__${cookiePrefix}_next-auth.nonce`,
    options: {
      httpOnly: secured,
      sameSite: 'lax',
      path: '/',
      secure: secured,
    },
  },
}
