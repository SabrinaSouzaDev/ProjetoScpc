import {
  PecuniaDTO,
  PostPecuniaParams,
  PutPecuniaParams,
} from '@/types/Pecunia'
import { PageInterface } from '@/types/PageInterface'
import { scpcApiFetchServer } from './server/config'
import { scpcApiFetchClient } from './client/config'
import { PageableProps } from '@/types/PageableProps'
import { SolicitacaoPecuniaFolgasParams } from './server/ServiceAprovarFolga'

export async function getPecuniaInformations(
  situacao: string,
  diretoriaId?: number,
  coordenadoriaId?: number,
  gerenciaId?: number,
  params?: PageableProps,
): Promise<PageInterface<PecuniaDTO>> {
  const parameters: SolicitacaoPecuniaFolgasParams = {
    situacao,
    diretoriaId,
    coordenadoriaId,
    gerenciaId,
    ...params,
  }
  const cleanedParameters = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => Boolean(value)),
  )
  const queryParams = new URLSearchParams(
    cleanedParameters as Record<string, string>,
  )
  const url = `/solicitacao-pecunia?${queryParams.toString()}`
  try {
    const resp: Response = await scpcApiFetchServer(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
    return await resp.json()
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }
}

export async function postPecuniaRequest(params: PostPecuniaParams) {
  const {
    situacao,
    status,
    valorUnitario,
    valorTotal,
    diretoriaId,
    creditoId,
    gerenciaId,
    nucleoId,
    contaId,
    agenciaId,
    bancoId,
  } = params

  const resp: Response = await scpcApiFetchClient(`/solicitacao-pecunia`, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({
      situacao,
      status,
      valorUnitario,
      valorTotal,
      diretoriaId,
      gerenciaId,
      nucleoId,
      creditosIds: [creditoId],
      contaId,
      agenciaId,
      bancoId,
    }),
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
  return resp.json()
}

export async function updatePecuniaRequest(params: PutPecuniaParams) {
  const { id, status, observation } = params
  try {
    const resp: Response = await scpcApiFetchClient(
      `/solicitacao-pecunia/atualizar-status`,
      {
        method: 'PUT',
        cache: 'no-cache',
        body: JSON.stringify({
          id,
          status,
          observation: observation || undefined,
        }),
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      },
    )

    const responseData = await resp.json()

    if (!resp.ok) {
      console.error(`Erro ao atualizar: ${responseData}`)
      throw new Error(`Erro na requisição: ${resp.status}`)
    }
    return responseData
  } catch (error) {
    console.error('Erro na função updatePecuniaRequest:', error)
    throw error
  }
}
