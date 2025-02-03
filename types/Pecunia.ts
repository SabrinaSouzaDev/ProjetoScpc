import { UnidadeAdministrativaType } from '@/utils/unidadeAdministrativa'
import { CreditoDTO } from './Credito'
import { StatusSolicitacao } from './Status'

export type PecuniaDTO = {
  creditos: CreditoDTO[]
  diretoriaId?: number
  diretoriaNome?: string
  nomeServidor?: string
  nucleoId: number
  nucleoNome?: string
  valorTotal: number
  valorUnitario: number
  id: number
  convenioId: number
  detalhamentoFonteId: number
  funcaoProgramaticaId: number
  gpparaId: number
  liquidacao?: number
  naturezaDespesaId: number
  numeroEmpenho?: number
  ob?: number
  planoInternoId: number
  situacao: UnidadeAdministrativaType
  publicado: boolean
  pagamentoRealizado: boolean
  justificativa: string
}

export type PostPecuniaParams = {
  situacao?: string
  status?: string
  valorUnitario: number
  diretoriaId: number | undefined
  gerenciaId?: number | undefined
  nucleoId?: number | undefined
  creditosIds: number[]
  contaId: string
  agenciaId: string
  bancoId: number
}

export type PutPecuniaParams = {
  id: number
  status: StatusSolicitacao
  observation?: string | undefined
  observacao?: string | undefined
}
