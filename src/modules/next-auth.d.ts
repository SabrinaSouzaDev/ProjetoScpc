// next-auth/core/types.ts

// Importe a interface DefaultSession original
import { DefaultSession } from 'next-auth/core/types'
import { KeycloakProfile } from 'next-auth/providers/keycloak'

// Sobrescreva a interface DefaultSession adicionando/modificando as propriedades conforme necessário
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      id?: string
      name?: string | null
      email?: string | null
      preferredUsername?: string
      image?: string
      accessToken?: string
      refreshToken?: string
      realmAccess: {
        roles: string[]
      }
      resourceAccess?: {
        [key: string]: {
          roles: string[]
        }
      }
      gerenciaId?: number
      nucleoId?: number
      diretoriaId?: number
      pessoaId?: number
    }
    // expires: string
    // accessToken?: string | null
    // refreshToken?: string | null
    error?: 'RefreshAccessTokenError'
  }
}

declare module 'next-auth/jwt' {
  export interface DefaultJWT extends KeycloakProfile {
    realmAccess: {
      roles: string[]
    }
    resourceAccess: {
      [key: string]: {
        roles: string[]
      }
    }
    accessToken?: string
    refreshToken?: string
    gerenciaId?: number
    nucleoId?: number
    diretoriaId?: number
    pessoaId?: number
  }

  export interface JWT extends Record<string, unknown>, DefaultJWT {
    realmAccess: {
      roles: string[]
    }
    resourceAccess: {
      [key: string]: {
        roles: string[]
      }
    }
    accessToken?: string
    refreshToken?: string
  }
}
