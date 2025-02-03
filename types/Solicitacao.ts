import { UnidadeAdministrativaType } from "@/utils/unidadeAdministrativa"

type Pessoa = {
  nomeCompleto: string
  cpf?: string
  email: string
}
type Servidor = {
  id: number
  pessoa: Pessoa
  matricula: string
}

type Plantao = {
  length: number
  id: number
  idServidor: Servidor
  inicioPlantao: string
  fimPlantao: string
}

type Credito = {
  id: number
  dataCredito: string
  plantao: Plantao
}

export type SolicitacaoDTO = {
  id: number
  nomeServidor: string
  creditos: Credito[]
  status: string
  situacao: UnidadeAdministrativaType
  tipoSolicitacao: string
  diretoriaId: number
  diretoriaNome: string
  nucleoId: number
  nucleoNome: string
  dataSolicitacao: string
}
