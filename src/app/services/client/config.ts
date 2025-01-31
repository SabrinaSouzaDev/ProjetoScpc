'use client'

import { getSession } from 'next-auth/react'

if (process.env.NEXT_PUBLIC_API_SCPC_URL === undefined) {
  throw new Error('NEXT_PUBLIC_API_SCPC_URL NÃO FOI INFORMADA.')
}

const apiAddressScpc: string = process.env.NEXT_PUBLIC_API_SCPC_URL

export async function scpcApiFetchClient(
  url: string,
  params?: RequestInit,
): Promise<Response> {
  const session = await getSession()
  const headers = new Headers(params?.headers ?? {})
  if (session?.user?.accessToken) {
    headers.append('Authorization', `Bearer ${session.user.accessToken}`)
  }

  const response = await fetch(`${apiAddressScpc}${url}`, {
    ...params,
    headers,
  })
  return response
}
