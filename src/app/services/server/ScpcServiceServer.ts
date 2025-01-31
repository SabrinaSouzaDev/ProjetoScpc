'use server'

import { Diretoria } from '@/types/UnidadesAdministrativas'
import { scpcApiFetchServer } from './config'

export async function consultaDiretorias(): Promise<Diretoria[]> {
  try {
    const resp: Response = await scpcApiFetchServer(`/diretoria`, {
      method: 'GET',
      cache: 'no-cache',
    })
    return await resp.json()
  } catch (error) {
    console.error('Erro ao buscar diretorias:', error) // Log do erro
    throw error // erro tratado na função que chama 'consultaDiretorias'
  }
}
