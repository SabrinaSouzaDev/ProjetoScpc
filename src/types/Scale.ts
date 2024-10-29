import { Date } from './Date'
import { DiretoriaDTO } from './Diretoria'
import { Servidor } from './Servidor'

export interface DutyRoster {
  id: number
  diretoria: DiretoriaDTO
  nucleo: DiretoriaDTO
  status: string
  tipo: string
}

export interface ScaleInfos {
  id: number
  servidor: Servidor
  escalaPlantao: DutyRoster
  dia: Date
  relatorioDescricao: string
  relatorioDiaEmitido: string
  status: string
  observacaoDia: string
}

export interface EscalaPlantaoDia {
  servidorId: number
  idDia: number
}

export interface CreateScale {
  tipo: string
  diretoriaId: number
  nucleoId?: number
  gerenciaId?: number
  idDia?: number
  idServidor?: number
  escalaPlantaoDia?: EscalaPlantaoDia[]
}
