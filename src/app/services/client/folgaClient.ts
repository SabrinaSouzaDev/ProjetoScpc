import { StatusSolicitacao } from '@/types/Status'
import { scpcApiFetchClient } from './config'

export type PutPecuniaParamsList = {
  id: number
  status: StatusSolicitacao
}
export async function updateFolgaRequestList(params: PutPecuniaParamsList[]) {
  const resp: Response = await scpcApiFetchClient(
    `/solicitacao-folga/atualizar-status-list`,
    {
      method: 'PUT',
      cache: 'no-cache',
      body: JSON.stringify(params),
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    },
  )
  return resp.json()
}
