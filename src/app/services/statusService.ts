'use server'
import { PageableProps } from '@/types/PageableProps'
import { PageInterface } from '@/types/PageInterface'
import { SolicitacaoDTO } from '@/types/Solicitacao'
import { ObjectUtils } from '@/utils/ObjectUtils'
import { scpcApiFetchServer } from './server/config'
export async function getRequestsInfos(
  tipoSolicitacao: 'PECUNIA' | 'FOLGA',
  params?: PageableProps,
): Promise<PageInterface<SolicitacaoDTO>> {
  const stringPageableParams = ObjectUtils.createQueryPageable(params)
  const resp: Response = await scpcApiFetchServer(
    `/solicitacao?tipoSolicitacao=${tipoSolicitacao}&${stringPageableParams}`,
    {
      method: 'GET',
      cache: 'no-cache',
    },
  )
  return await resp.json()
}

export async function getRequestsFromUser(
  tipoSolicitacao: 'PECUNIA' | 'FOLGA',
  idServidor: number,
  params?: PageableProps,
): Promise<PageInterface<SolicitacaoDTO>> {
  try {
    const stringPageableParams = ObjectUtils.createQueryPageable(params)
    const url = `/solicitacao/usuario/${idServidor}?tipoSolicitacao=${tipoSolicitacao}&${stringPageableParams}`
    console.log('Request URL:', url)

    const resp: Response = await scpcApiFetchServer(url, {
      method: 'GET',
      cache: 'no-cache',
    })

    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`)
    }

    const data = await resp.json()
    // alert(data)

    return data
  } catch (error) {
    console.error('Error fetching requests:', error)
    throw error
  }
}
