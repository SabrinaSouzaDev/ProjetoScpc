import { PageInterface } from '@/types/PageInterface'
import { scpcApiFetchClient } from './client/config'
import { scpcApiFetchServer } from './server/config'
import { FolgaDTO } from '@/types/Folga'

type UpdateFolgaParams = {
  id: number
  status: string
}

export async function getFolgasInfosBySituation(
  situacao: string,
): Promise<PageInterface<FolgaDTO>> {
  const resp: Response = await scpcApiFetchServer(
    `/solicitacao-folga/unidade-administrativa?situacao=${situacao}`,
    {
      method: 'GET',
      cache: 'no-cache',
    },
  )
  return await resp.json()
}

export async function updateFolgaRequest(params: UpdateFolgaParams) {
  const { id, status } = params
  const resp: Response = await scpcApiFetchClient(
    `/solicitacao-folga/atualizar-status`,
    {
      method: 'PUT',
      cache: 'no-cache',
      body: JSON.stringify({
        id,
        status,
      }),
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    },
  )
  return resp.json()
}
