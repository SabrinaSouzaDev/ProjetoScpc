'use client'

import { Plantao } from '@/app/(painel)/folgas/lancar-creditos-plantao/components/types/plantaoDTO'
import {
  Credito,
  CreditoPlantaoDTO,
  SolicitacaoFolgaCreateDTO,
} from '@/types/Credito'
import { PageInterface } from '@/types/PageInterface'
import { Servidor } from '@/types/Servidor'
import { Coordenadoria, Gerencia } from '@/types/UnidadesAdministrativas'
import { scpcApiFetchClient } from './config'
import { handleError } from '@/utils/ErrorMensage'
import { CursoType } from '@/app/(painel)/cursos/type/CursoType'
import { FolgaAprovarUpdateDTO } from '@/types/Folga'

export async function consultaCoordenadoriasByDiretoria(
  id: number,
): Promise<Coordenadoria[]> {
  try {
    const resp: Response = await scpcApiFetchClient(
      `/coordenadoria/list-diretoria-id/${id}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    await handleError(resp)
    return resp.json()
  } catch (error) {
    return []
  }
}

export async function consultaGerenciasByCoordenadoria(
  id: number,
): Promise<Gerencia[]> {
  try {
    const resp: Response = await scpcApiFetchClient(
      `/gerencia/list-coordenadoria-id/${id}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    await handleError(resp)
    return resp.json()
  } catch (error) {
    return []
  }
}

export async function consultaGerenciasByDiretoria(id: number) {
  const resp: Response = await scpcApiFetchClient(
    `/gerencia/list-diretoria-id/${id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    },
  )
  await handleError(resp)
  return resp.json()
}

export async function consultaServidoresByDiretoria(
  id: number,
): Promise<Servidor[]> {
  try {
    const resp: Response = await scpcApiFetchClient(
      `/servidor/diretoria/${id}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    await handleError(resp)
    return resp.json()
  } catch (error) {
    return []
  }
}

export async function consultaSaldoByServidor(id: number): Promise<number> {
  try {
    const resp: Response = await scpcApiFetchClient(
      `/plantao/plantoes-por-servidor/${id}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    const data = await resp.json()
    return data.saldo
  } catch (error) {
    console.error('Erro ao consultar saldo:', error)
    return 0 // ou valor padrão
  }
}

export async function consultaServidoresByCoordenadoria(
  id: number,
): Promise<Servidor[]> {
  try {
    const resp: Response = await scpcApiFetchClient(
      `/servidor/coordenadoria/${id}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    await handleError(resp)
    return resp.json()
  } catch (error) {
    return []
  }
}

export async function consultaServidoresByGerencia(
  id: number,
): Promise<Servidor[]> {
  try {
    const resp: Response = await scpcApiFetchClient(
      `/servidor/gerencia/${id}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    await handleError(resp)
    return resp.json()
  } catch (error) {
    return []
  }
}

export async function salvarFolgas(credito: Credito) {
  try {
    const resp: Response = await scpcApiFetchClient(`/credito/salvar`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(credito),
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
    await handleError(resp)
    return resp.json()
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }
}

export async function salvarPlantao(plantao: Plantao) {
  try {
    const resp: Response = await scpcApiFetchClient(`/plantao`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(plantao),
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
    await handleError(resp)
    return resp.json()
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }
}

export async function salvarCurso(curso: CursoType, certificado: File) {
  try {
    const formData = new FormData()
    // Adicione os campos de dados ao FormData
    formData.append('nome', curso.nome)
    formData.append(
      'cargaHorariaEstimada',
      curso.cargaHoraria?.toString() || '',
    )
    formData.append('nomeInstituicao', curso.nomeInstituicao)
    formData.append('inicioCurso', curso.periodo || '')
    formData.append('finalCurso', curso.periodoFim || '')
    formData.append('dataExpedido', curso.dataCertificacao || '')
    formData.append('certificado', certificado, certificado.name) // Aqui adiciona o certificado corretamente
    formData.append('diretoriaId', curso.diretoriaId?.toString() || '')
    formData.append('servidorEmail', curso.email)
    formData.append('servidorId', curso.idServidor?.toString() || '')
    formData.append('nucleoId', curso.nucleoId?.toString() || '')
    formData.append('gerenciaId', curso.gerenciaId?.toString() || '')
    formData.append(
      'areaConhecimento.id',
      String(curso.areaDeConhecimento) || '',
    )
    formData.append('tipo.id', String(curso.tipo) || '')
    formData.append('modalidade.id', String(curso.modalidadeDoEvento) || '')

    const resp: Response = await scpcApiFetchClient(`/capacitacao`, {
      method: 'POST',
      cache: 'no-cache',
      body: formData,
      headers: {
        accept: '*/*',
      },
    })

    await handleError(resp)
    return resp.json()
  } catch (error) {
    console.error('Erro ao salvar curso:', error)
    return null
  }
}

export async function solicitarFolga(credito: SolicitacaoFolgaCreateDTO) {
  try {
    const resp: Response = await scpcApiFetchClient(`/solicitacao-folga`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(credito),
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
    await handleError(resp)
    return resp.json()
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }
}

export async function CienciaFolgaAtualizacao(ids: number[]): Promise<string> {
  const queryParams = ids.map((id) => `ids=${id}`).join('&')
  const url = `/solicitacao-folga/ciencia-subdefensoria?${queryParams}`

  try {
    const resp: Response = await scpcApiFetchClient(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        accept: '*/*',
        'content-type': 'application/json;charset=UTF-8',
      },
      body: '', // Corpo vazio conforme o cURL
    })

    // if (!resp.ok) {
    //   let errorMessage = 'Erro ao processar a solicitação'

    await handleError(resp)
    return await resp.json()
  } catch (error) {
    console.error('Erro ao buscar créditos:', error)
    throw error
  }
}

export async function consultaCreditosServidor(
  idServidor: number,
): Promise<PageInterface<CreditoPlantaoDTO>> {
  try {
    const resp: Response = await scpcApiFetchClient(
      `/credito/plantao/${idServidor}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    await handleError(resp)
    return await resp.json()
  } catch (error) {
    console.error('Erro ao buscar créditos:', error)
    throw error
  }
}
export async function AprovarFolgaAtualizacao(
  credito: FolgaAprovarUpdateDTO[],
): Promise<string> {
  try {
    const resp: Response = await scpcApiFetchClient(
      `/solicitacao-folga/atualizacao-status-list`,
      {
        method: 'PUT',
        cache: 'no-cache',
        body: JSON.stringify(credito),
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      },
    )
    await handleError(resp)
    // Sucesso (201 - Created)
    if (resp.status === 201) {
      return 'Solicitado com Sucesso'
    }
    // Retorna a resposta padrão em JSON para outros códigos de sucesso, se houver
    return await resp.json()
  } catch (error) {
    // Tratamento de erro genérico
    if (error instanceof Error) {
      return `Falha na requisição: ${error.message}`
    }
    return 'Falha na requisição: Ocorreu um erro inesperado.'
  }
}
