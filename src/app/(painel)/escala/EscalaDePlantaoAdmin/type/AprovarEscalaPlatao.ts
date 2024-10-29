import {
  Coordenadoria,
  Diretoria,
  Gerencia,
} from '@/types/UnidadesAdministrativas'

export type ServidorId = {
  id?: number
  nome?: string
}
type EscalaPlantaoDias = {
  id?: number | null
  servidor?: ServidorId
  relatorioDescricao?: string
  observacaoDia?: string
  dia?: {
    id?: number
    dia?: string
  }
}

export type EscalaPlantao = {
  id: number
  gerencia?: Gerencia | null
  nucleo?: Coordenadoria | null
  diretoria?: Diretoria | null
  tipo: string
  status?: string
  situacao?: string
  observacao?: string
  escalasPlantaoDias?: EscalaPlantaoDias[]
}
