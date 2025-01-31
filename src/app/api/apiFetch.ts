import { getServerSession } from 'next-auth'
import { apiAddress } from './apiOptions'
import { Diretoria } from '@/types/UnidadesAdministrativas'
import { authOptions } from './auth/[...nextauth]/authOptions'

export async function apiFetch(
  url: string,
  params?: RequestInit,
): Promise<Response> {
  const session = await getServerSession(authOptions)
  const headers = new Headers(params?.headers ?? {})

  if (session?.user?.accessToken) {
    headers.append('Authorization', `Bearer ${session.user.accessToken}`)
  }
  const response = await fetch(url, { ...params, headers })
  return response
}

export async function consultarDiretoriasSSR(): Promise<Diretoria[]> {
  const resp: Promise<Diretoria[]> = apiFetch(apiAddress + '/diretoria', {
    method: 'GET',
    cache: 'no-cache',
  })
    .then((r) => r.json())
    .catch(() => undefined)
  return resp
}
