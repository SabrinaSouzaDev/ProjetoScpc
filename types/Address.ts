interface Estado {
  id: number
  nome: string
  sigla: string
}

export interface Endereco {
  id: number
  rua: string
  numero: number
  bairro: string
  cidade: string
  cep: string
  estado: Estado
  pais: string
}
