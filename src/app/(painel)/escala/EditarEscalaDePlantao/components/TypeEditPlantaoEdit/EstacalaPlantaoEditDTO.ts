export type ServidorId = {
  id?: number
  nome?: string
}
type EscalaPlantaoDias = {
  id?: number | null
  servidorId?: number
  relatorioDescricao?: string
  observacaoDia?: string
  idDia?: number
}

export type EscalaPlantao = {
  id: number
  gerenciaId?: number | null
  nucleoId?: number | null
  diretoriaId?: number | null
  tipo: string
  escalasPlantaoDias?: EscalaPlantaoDias[]
}

export type EscalaGetResponse = {
  id: number
  tipo?: string
  status?: string
  situacao?: string
  diretoria?: {
    id?: number
    nome?: string
  } | null
  nucleo: {
    id?: number
    nome?: string
  } | null
  observacao?: string
  gerencia?: {
    id?: number
    nome?: string
  } | null
  escalasPlantaoDias?: Array<{
    id?: number | null
    servidor?: {
      id?: number
      nome?: string
    }
    dia?: {
      id?: number
      dia?: string // Supondo que o formato da data é uma string
    }
  }>
}
