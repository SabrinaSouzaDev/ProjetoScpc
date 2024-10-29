import { z } from 'zod'
import { listItemSchema } from '../cadastro/components/CourseFormSchema'

export type CursoType = {
  gerenciaId?: number
  nucleoId?: number
  diretoriaId?: number
  idServidor: number
  areaDeConhecimento: string | null // Permite null
  modalidadeDoEvento: string | null // Permite null
  tipo: string | null // Permite null
  nome: string
  cargaHoraria: number
  nomeInstituicao: string
  periodo?: string
  periodoFim?: string
  dataCertificacao?: string
  email: string
  certificado: File
}

export type Pessoa = {
  nomeCompleto: string
  cpf?: string
}

export type Servidor = {
  id: number
  pessoa: Pessoa
  matricula: string
}

export type listItemSchemaType = z.infer<typeof listItemSchema>
