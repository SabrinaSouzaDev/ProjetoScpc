import { CreditoDTO } from './Credito'
import { PageableProps } from './PageableProps'
import { StatusSolicitacao } from './Status'

export type PecuniaPlantao = {
  id: number
  idServidor: number
  inicioPlantao: string
  fimPlantao: string
  nomeServidor: string
}

export type NuplanChildrensData = {
  codigo: string
  descricao: string
  numeroPi?: string
  id: number
}

export type NuplanDTO = {
  detalhamentoFonte: NuplanChildrensData
  funcaoProgramatica: NuplanChildrensData
  gppara: NuplanChildrensData
  naturezaDespesa: NuplanChildrensData
  planoInterno: NuplanChildrensData
  convenio: NuplanChildrensData
}

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
  //
}

export type GetPecuniaDTO = {
  situacao: string
  diretoriaId: number
  coordenadoriaId: number
  gerenciaId: number
  params: PageableProps
}

export type PostPecuniaParams = {
  situacao: string
  status: string
  valorUnitario: number
  valorTotal: number
  diretoriaId: number | undefined
  gerenciaId?: number | undefined
  nucleoId?: number | undefined
  creditoId: number
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
