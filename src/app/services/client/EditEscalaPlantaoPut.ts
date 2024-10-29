import { EscalaPlantao } from '@/app/(painel)/escala/EditarEscalaDePlantao/components/TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'
import { scpcApiFetchClient } from './config'
export interface ApiError {
  message: string
  technicalMessage?: string
  internalCode?: string
}

export async function updateEscalaEditRequest(escala: EscalaPlantao) {
  try {
    const resp: Response = await scpcApiFetchClient(`/escala-plantao`, {
      method: 'PUT',
      cache: 'no-cache',
      body: JSON.stringify(escala),
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })

    if (!resp.ok) {
      const errorData = await resp.json()
      throw new Error(errorData?.technicalMessage || 'Erro desconhecido')
    }

    return resp.json()
  } catch (error) {
    console.error('Erro ao salvar escala:', error)
    throw error
  }
}
