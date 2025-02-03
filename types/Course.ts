import { Servidor } from './Servidor'
import { Coordenadoria, Diretoria, Gerencia } from './UnidadesAdministrativas'

export interface CourseContentDTO {
  id: number
  nome: string
  nomeInstituicao: string
  dataExpedido: string
  situacao: string
  resourceUrl: string
  servidor: Servidor
  diretoria: Diretoria
  coordenadoria: Coordenadoria
  gerencia: Gerencia
  cargaHorariaAceita: number
  cargaHorariaEstimada: number
}

export interface UpdateCourse {
  id: number
  cargaHorariaAceita: number
  situacao: string
  observacao: string | undefined
}
