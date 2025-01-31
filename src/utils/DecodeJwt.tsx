import { TokenPayload } from '@/types/keycloak/TokenPayload'

export function decodeJWT(token: string): TokenPayload {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}
