import { handleError } from '@/utils/ErrorMensage'
import { scpcApiFetchClient } from '../client/config'

export type Banco = {
  id: number
  nome: string
}

export type Agencia = {
  agenciaId: string
  bancoId: number
  banco: Banco
}

export type Conta = {
  contaId: string
  agenciaId: string
  bancoId: number
  agencia: Agencia
}

export type UserConta = {
  id?: number
  pessoa?: {
    nomeCompleto?: string
    conta?: Conta[]
  }
  matricula?: string
  funcao?: {
    id: number
    nome: string
  }
}
// Tipo simplificado, se a resposta não for paginada
export async function consultaContaServidor(id: number): Promise<UserConta> {
  try {
    const resp: Response = await scpcApiFetchClient(
      `/servidor/${id}/conta/list`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          accept: '*/*',
        },
      },
    )

    await handleError(resp) // Se existir lógica de erro

    // Retorna os dados da resposta como UserConta
    const data = await resp.json()

    // Verifique se a resposta contém as propriedades esperadas
    if (!data || !data.pessoa || !data.pessoa.conta) {
      throw new Error('Estrutura de dados inesperada')
    }

    return data as UserConta // Assegura que está retornando UserConta
  } catch (error) {
    console.error('Erro ao buscar conta bancária:', error)
    throw error // Repassa o erro para o manipulador
  }
}
