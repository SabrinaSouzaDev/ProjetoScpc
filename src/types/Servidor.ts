export type Pessoa = {
  nomeCompleto: string
  cpf: string
  email?: string
  id: string
}

export type Servidor = {
  id: number
  pessoa: Pessoa
  matricula: string
  nome: string
}
