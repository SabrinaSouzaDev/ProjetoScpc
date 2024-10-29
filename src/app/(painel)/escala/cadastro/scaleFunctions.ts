import {
  consultaCoordenadoriasByDiretoria,
  consultaGerenciasByCoordenadoria,
  consultaServidoresByCoordenadoria,
  consultaServidoresByDiretoria,
  consultaServidoresByGerencia,
} from '@/app/services/client/ScpcServiceClient'
import { Servidor } from '@/types/Servidor'
import { Coordenadoria } from '@/types/UnidadesAdministrativas'

interface GetUserListParams {
  type: 'DIRETORIA' | 'COORDENADORIA' | 'GERENCIA'
  diretoriaId?: number
  coordenadoriaId?: number
  gerenciaId?: number
}

export const handleGetCoordenadoriaList = async (
  diretoriaId: number,
): Promise<Coordenadoria[] | []> => {
  try {
    return await consultaCoordenadoriasByDiretoria(diretoriaId)
  } catch (err) {
    return []
  }
}

export const handleGetGerenciaList = async (coodenadoria: number) => {
  try {
    return await consultaGerenciasByCoordenadoria(coodenadoria)
  } catch (err) {
    return []
  }
}

export const handleGetUserList = async ({
  type,
  coordenadoriaId,
  diretoriaId,
  gerenciaId,
}: GetUserListParams): Promise<Servidor[] | []> => {
  try {
    switch (type) {
      case 'DIRETORIA':
        if (!diretoriaId) {
          return []
        }
        return await consultaServidoresByDiretoria(diretoriaId)
      case 'COORDENADORIA':
        if (!coordenadoriaId) {
          return []
        }
        return await consultaServidoresByCoordenadoria(coordenadoriaId)
      case 'GERENCIA':
        if (!gerenciaId) {
          return []
        }
        return await consultaServidoresByGerencia(gerenciaId)
    }
  } catch (err) {
    return []
  }
}
