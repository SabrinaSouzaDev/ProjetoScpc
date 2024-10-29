import { DiretoriaDTO } from './Diretoria'

export type Credito = {
  servidorId: number
  numeroFolgas: number
}

export type CreditoCreateDTO = {
  servidorId: number
  numeroFolgas: number
  inicioPlantao?: string
  fimPlantao?: string
  decaido?: boolean // Adicionando a propriedade decaido
  aptoParaPecunia?: boolean
}

export type CreditoSolicitacaoDTO = {
  id: number
  idPlantao: number
  servidorId: number
  numeroFolgas: number
  inicioPlantao?: Date
  fimPlantao?: Date
  dataReferencia?: string
  decaido?: boolean // Adicionando a propriedade decaido
  aptoParaPecunia?: boolean
}

export type SolicitacaoCreditoDTO = {
  id: number
  idServidor: number
  nomeServidor?: string
  diretoriaDTO?: DiretoriaDTO
  observacao?: string
  inicioPlantao?: string
  fimPlantao?: string
}

export type CreditoPlantaoDTO = {
  id: number
  idPlantao: number
  numeroPesos: number
  dataCredito: Date
  pesoMeio?: boolean
  pesoDois?: boolean
}

export type CreditosFolgaPlantaoDTO = {
  id: number
  inicioPlantao: string
  fimPlantao: string
  idServidor: number
}

export interface CreditoDTO {
  dataCredito?: string
  id: number
  idServidor: number
  pesoDois?: boolean
  pesoMeio?: boolean
  plantao: CreditosFolgaPlantaoDTO
  idPlantao?: number
  oriundoCurso?: boolean
  inicioPlantao?: string
  fimPlantao?: string
  dataReferencia?: string
  convertivelPecunia?: boolean
  nomeServidor: string
}

export interface SolicitacaoFolgaCreateDTO {
  id?: number
  creditoId: number
  creditoMeio?: number
  dataFolga: string
  gerenciaId?: number
  nucleoId?: number
  status?: 'SOLICITADO' | 'INDEFERIDO' | 'DEFERIDO' | 'CANCELADO'
  situacao?: 'GERENCIA' | 'DIRETORIA' | 'SUBDEFENSORIA' | 'GGP'
  diretoriaId: number
}
