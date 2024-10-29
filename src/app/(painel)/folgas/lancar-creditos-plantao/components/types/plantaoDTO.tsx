import { Pessoa } from '@/types/Servidor'

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

export type FolgasUtilizadas = {
  dataDoPlantao?: Date
  dataUtilizada?: Date
  dataDoPlantaoMeio?: Date
  requerimento?: string
}

export type PlantaoAdd = {
  dataPlantao?: Date
  pesoMeio?: boolean
  pesoDois?: boolean
  processo?: string
}

export type Plantao = {
  gerenciaId?: number | null
  nucleoId?: number | null
  diretoriaId?: number | null
  idServidor: number
  saldo: number /// ANCHOR - ALTERAR
  folgas: FolgasUtilizadas[]
  inicioPlantao?: string
  fimPlantao?: string
  decaido?: boolean
  converterPecunia?: boolean
  plantaoAdd: PlantaoAdd[]
}

export type Servidor = {
  id: number
  pessoa: Pessoa
  matricula: string
}
