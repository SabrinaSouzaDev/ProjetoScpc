import { UserSessionDTO } from '@/types/UserSession'
import { decodeJWT } from '@/utils/DecodeJwt'
import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Keycloak from 'next-auth/providers/keycloak'
import { cookiesOptions } from './cookieOptions'

if (!process.env.KEYCLOACK_BASE || !process.env.KEYCLOACK_REALM) {
  throw new Error('KEYCLOACK_BASE OU KEYCLOACK_REALM NÃO FOI INFORMADA')
}

if (
  process.env.AUTH_KEYCLOAK_ID === undefined ||
  process.env.AUTH_KEYCLOAK_SECRET === undefined
) {
  throw new Error('Missing environment variables for Keycloak (Authentication)')
}

const issuerKeycloack = process.env.KEYCLOACK_BASE + process.env.KEYCLOACK_REALM
async function refreshToken(refreshToken: string): Promise<Response> {
  const response = await fetch(
    `${issuerKeycloack}/protocol/openid-connect/token`,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_ID!,
        client_secret: process.env.KEYCLOAK_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      method: 'POST',
    },
  )
  return response
}

async function getTokenData(
  accessToken?: string,
): Promise<UserSessionDTO | undefined> {
  if (accessToken) {
    const response = await fetch(
      `${process.env.API_SCPC_URL}/servidor/sessao`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        method: 'GET',
      },
    )
    if (response.ok) {
      return response.json()
    }
    return undefined
  }
  return undefined
}

export const authOptions: NextAuthOptions = {
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
      issuer: issuerKeycloack,
    }),
  ],
  cookies: cookiesOptions,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const nome = await getTokenData(account.access_token)
        // First login, save the `access_token`, `refresh_token`, and other
        // details into the JWT
        // eslint-disable-next-line camelcase
        const { resource_access, realm_access } = decodeJWT(
          account.access_token as string,
        )
        return {
          // ...profile, // Dados padrão do JWT
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          // eslint-disable-next-line camelcase
          realmAccess: realm_access, // permissão no realm
          // eslint-disable-next-line camelcase
          resourceAccess: resource_access, // permissão nos client
          gerenciaId: nome?.gerenciaId,
          diretoriaId: nome?.diretoriaId,
          nucleoId: nome?.nucleoId,
          pessoaId: nome?.pessoaId,
        }
      } else if (token.exp !== undefined && Date.now() < token.exp * 1000) {
        // Subsequent logins, if the `access_token` is still valid, return the JWT
        return token
      } else {
        // Subsequent logins, if the `access_token` has expired, try to refresh it
        if (!token.refreshToken) throw new Error('Missing refresh token')

        try {
          // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
          // at their `/.well-known/openid-configuration` endpoint.
          // i.e. https://accounts.google.com/.well-known/openid-configuration
          const response = await refreshToken(token.refreshToken)

          const responseTokens = await response.json()

          if (!response.ok) throw responseTokens

          return {
            // Keep the previous token properties
            ...token,
            accessToken: responseTokens.access_token,
            expires_at: Math.floor(
              Date.now() / 1000 + (responseTokens.expires_in as number),
            ),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refreshToken: responseTokens.refresh_token ?? token.refreshToken,
          }
        } catch (error) {
          console.error('Error refreshing access token', error)
          // The error property can be used client-side to handle the refresh token error
          return { ...token, error: 'RefreshAccessTokenError' as const }
        }
      }
    },
    async session({ session, token }) {
      session.user = {
        email: token.email ?? '',
        id: token.sub!,
        image: token.picture ?? undefined,
        name: token.name!,
        preferredUsername: token.preferred_username,
        realmAccess: token.realmAccess,
        resourceAccess: token.resourceAccess,
        accessToken: token.accessToken,
        gerenciaId: token.gerenciaId,
        nucleoId: token.nucleoId,
        diretoriaId: token.diretoriaId,
        pessoaId: token.pessoaId,
      }
      return session
    },
  },
  pages: {
    signIn: process.env.NEXT_PUBLIC_BASE_PATH + '/auth/signin',
    signOut: process.env.NEXT_PUBLIC_BASE_PATH + '/auth/signout',
  },
  events: {
    async signOut(props) {
      const prop = props as { token: JWT }
      if (process.env.KEYCLOACK_BASE && process.env.KEYCLOACK_REALM) {
        await fetch(
          `${process.env.KEYCLOACK_BASE + process.env.KEYCLOACK_REALM}/protocol/openid-connect/logout`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: process.env.AUTH_KEYCLOAK_ID ?? 'no_client',
              client_secret: process.env.AUTH_KEYCLOAK_SECRET ?? 'no_secret',
              refresh_token: prop.token.refreshToken!,
            }),
            method: 'POST',
          },
        )
      }
    },
  },
}
