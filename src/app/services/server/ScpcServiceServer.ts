'use server'
import { CreditoDTO, SolicitacaoCreditoDTO } from '@/types/Credito'
import { PageableProps } from '@/types/PageableProps'
import { PageInterface } from '@/types/PageInterface'
import { Diretoria } from '@/types/UnidadesAdministrativas'
import { ObjectUtils } from '@/utils/ObjectUtils'
import { scpcApiFetchServer } from './config'
import { SolicitacaoFolgaDTO } from '@/types/Folga'
// import { handleError } from '../client/ScpcServiceClient'

export async function consultaDiretorias(): Promise<Diretoria[]> {
  try {
    const resp: Response = await scpcApiFetchServer(`/diretoria`, {
      method: 'GET',
      cache: 'no-cache',
    })
    if (!resp.ok) {
      throw new Error(`Erro na requisição: ${resp.status} ${resp.statusText}`)
    }
    const diretorias: Diretoria[] = await resp.json()
    if (!Array.isArray(diretorias)) {
      throw new Error('Formato inesperado de resposta da API.')
    }
    return diretorias
  } catch (error) {
    console.error('Erro ao buscar diretorias:', error)
    throw error
  }
}

export async function consultaCreditosServidor(
  idServidor: number,
  tipoSolicitacao?: 'GERAL' | 'FOLGA',
  params?: PageableProps,
): Promise<PageInterface<CreditoDTO>> {
  const stringPageableParams = ObjectUtils.createQueryPageable(params)
  try {
    const resp: Response = await scpcApiFetchServer(
      `/credito/servidor/${idServidor}?tipoSolicitacao=${tipoSolicitacao}&${stringPageableParams}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    return await resp.json()
  } catch (error) {
    console.error('Erro ao buscar créditos:', error)
    throw error
  }
}
// Função para consultar solicitações de folga
export async function consultaSolicitacaoFolgaAprova(
  params?: PageableProps,
): Promise<PageInterface<SolicitacaoFolgaDTO>> {
  const stringPageableParams = ObjectUtils.createQueryPageable(params)
  try {
    const resp: Response = await scpcApiFetchServer(
      `/solicitacao-folga?${stringPageableParams}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    if (!resp.ok) {
      const errorResponse = await resp.json()
      console.error('Detalhes do erro:', errorResponse)
      throw new Error('Erro ao processar a solicitação')
    }

    return await resp.json()
  } catch (error) {
    console.error('Erro ao buscar solicitações de folga:', error)
    throw new Error('Erro ao processar a solicitação')
  }
}

export async function consultaCreditosPlantaoServidor(
  idServidor: number,
  params?: PageableProps,
): Promise<PageInterface<CreditoDTO>> {
  const stringPageableParams = ObjectUtils.createQueryPageable(params)
  try {
    const resp: Response = await scpcApiFetchServer(
      `/credito/plantao/${idServidor}?${stringPageableParams}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    return await resp.json()
  } catch (error) {
    console.error('Erro ao buscar créditos:', error)
    throw error
  }
}

export async function consultarPlantao(
  params?: PageableProps,
): Promise<PageInterface<CreditoDTO>> {
  const stringPageableParams = ObjectUtils.createQueryPageable(params)
  try {
    const resp: Response = await scpcApiFetchServer(
      `/plantao?${stringPageableParams}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    if (!resp.ok) {
      throw new Error('Erro 32 ao buscar créditos')
    }
    return await resp.json()
  } catch (error) {
    console.error('Erro 32 ao buscar créditos:', error)
    throw error
  }
}
export async function solicitarFolgaSubDefensoria(
  params?: PageableProps,
): Promise<PageInterface<SolicitacaoCreditoDTO>> {
  const stringPageableParams = ObjectUtils.createQueryPageable(params)
  try {
    const resp: Response = await scpcApiFetchServer(
      `/solicitacao-folga/subdefensoria?${stringPageableParams}`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      },
    )
    return resp.json()
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }
}
