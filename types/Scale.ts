import { DiretoriaDTO } from './Diretoria'
import { Servidor } from './Servidor'

export interface DutyRoster {
  id: number
  diretoria: DiretoriaDTO
  nucleo: DiretoriaDTO
  status: string
  tipo: string
}

interface Dia {
  dia: string
}

export interface ScaleInfos {
  id: number
  servidor: Servidor
  escalaPlantao: DutyRoster
  dia: Dia
  relatorioDescricao: string
  relatorioDiaEmitido: string
  status: string
  observacaoDia: string
}

export interface EscalaPlantaoDia {
  servidorId: number
  idDia: number
  enderecoId: number
}

export interface CreateScale {
  tipo: string
  diretoriaId?: number
  nucleoId?: number
  gerenciaId?: number
  idDia?: number
  idServidor?: number
  escalaPlantaoDia?: EscalaPlantaoDia[]
}
