export type Gerencia = {
  id: number
  nome: string
  coordenadoriaId: number // Adicionado para relacionar com Coordenadoria
}

export type Coordenadoria = {
  id: number
  nome: string
  diretoriaId: number // Adicionado para relacionar com Diretoria
}

export type Diretoria = {
  id: number
  nome: string
}

export type Plantao = {
  servidorId: number
  saldo: number
  inicioPlantao?: string
  fimPlantao?: string
  prescrito?: boolean
  converterPecunia?: boolean
}

export type Pessoa = {
  nomeCompleto: string
  cpf: string
}

export type Servidor = {
  id: number
  pessoa: Pessoa
  matricula: string
}
