'use client'

import { Credito } from '@/types/Credito'
import { Servidor } from '@/types/Servidor'
import { Coordenadoria, Gerencia } from '@/types/UnidadesAdministrativas'

import { scpcApiFetchClient } from './config'
import { Plantao } from '@/app/(painel)/folgas/lancar-creditos-diretoria/type/plantaoDTO'
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
    return resp.json()
  } catch (error) {
    return []
  }
}

export async function consultaGerenciasByDiretoria(
  id: number,
): Promise<Gerencia[]> {
  try {
    const resp: Response = await scpcApiFetchClient(
      `/gerencia/list-diretoria-id/${id}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    )
    return resp.json()
  } catch (error) {
    console.log(error)
    return []
  }
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
    return resp.json()
  } catch (error) {
    return []
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
    return resp.json()
  } catch (error) {
    return []
  }
}

export async function salvarFolgas(credito: Credito): Promise<string> {
  try {
    const resp: Response = await scpcApiFetchClient(`/credito/salvar`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(credito),
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
    return resp.json()
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }
}

export async function salvarPlantao(plantao: Plantao): Promise<string> {
  console.log(plantao)
  try {
    const resp: Response = await scpcApiFetchClient(`/plantao`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(plantao),
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
    return resp.json()
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }
}
