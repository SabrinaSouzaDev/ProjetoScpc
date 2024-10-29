'use server'

import { PageInterface } from '@/types/PageInterface'
import { scpcApiFetchServer } from './config'
import { PageableProps } from '@/types/PageableProps'
import { EscalaPlantao } from '@/app/(painel)/escala/EditarEscalaDePlantao/components/TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'

export interface SolicitacaoPecuniaFolgasParams extends PageableProps {
  situacao: string
  diretoriaId?: number
  status?: string
  nucleoId?: number
  gerenciaId?: number
}

export async function consultaEditarSolicitacaoEscalaPlantao(
  situacao: string,
  diretoriaId?: number,
  status?: string,
  nucleoId?: number,
  gerenciaId?: number,
  params?: PageableProps,
): Promise<PageInterface<EscalaPlantao>> {
  const parameters: SolicitacaoPecuniaFolgasParams = {
    situacao,
    diretoriaId,
    status,
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
  const url = `/escala-plantao?${queryParams.toString()}`
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
