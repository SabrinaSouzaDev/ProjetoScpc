'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'

if (process.env.API_SCPC_URL === undefined) {
  throw new Error('API_SCPC_URL NÃO FOI INFORMADA.')
}

const apiAddressScpc: string = process.env.API_SCPC_URL

export async function scpcApiFetchServer(
  url: string,
  params?: RequestInit,
): Promise<Response> {
  const session = await getServerSession(authOptions)
  const headers = new Headers(params?.headers ?? {})
  if (session?.user?.accessToken) {
    headers.append('Authorization', `Bearer ${session.user.accessToken}`)
    console.log(`Bearer ${session.user.accessToken}`)
  }

  try {
    const response = await fetch(`${apiAddressScpc}${url}`, {
      ...params,
      headers,
    })

    const text = await response.text()
    console.log('Resposta da API:', text)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return new Response(text, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    })
  } catch (error) {
    console.error('Erro na requisição:', error)
    throw error
  }
}
