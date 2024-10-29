'use server'

import { PageInterface } from '@/types/PageInterface'
import { scpcApiFetchServer } from './config'
import { PageableProps } from '@/types/PageableProps'
import { SolicitacaoFolgaDTO } from '@/types/Folga'

export interface SolicitacaoPecuniaFolgasParams extends PageableProps {
  situacao: string
  diretoriaId?: number
  nucleoId?: number
  coordenadoriaId?: number
  gerenciaId?: number
}

export async function consultaAprovarSolicitacaoFolga(
  situacao: string,
  diretoriaId?: number,
  nucleoId?: number,
  gerenciaId?: number,
  params?: PageableProps,
): Promise<PageInterface<SolicitacaoFolgaDTO>> {
  const parameters: SolicitacaoPecuniaFolgasParams = {
    situacao,
    diretoriaId,
    nucleoId,
    gerenciaId,
    ...params,
  }
  const cleanedParameters = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => Boolean(value)),
  )
  const queryParams = new URLSearchParams(
    cleanedParameters as Record<string, string>,
  )
  const url = `/solicitacao-folga/unidade-administrativa?${queryParams.toString()}`
  try {
    const resp: Response = await scpcApiFetchServer(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`)
    }
    return await resp.json()
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }
}
