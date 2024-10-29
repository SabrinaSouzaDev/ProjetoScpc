// type plantao = {
//   id: number
//   idServidor: number
//   inicioPlantao: string
//   fimPlantao: string
// }
// type Creditos = {
//   id: number
//   dataCredito: Date
//   plantao: plantao[]
// }

// export type SolicitacaoDTO = {
//   id: number
//   credito: Creditos
//   status: string
//   dataSolicitacao: string
// }

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
  nomeServidor: string
  creditos: Credito[]
  status: string
  situacao: string
  tipoSolicitacao: string
  diretoriaId: number
  diretoriaNome: string
  nucleoId: number
  nucleoNome: string
  dataSolicitacao: string
}
