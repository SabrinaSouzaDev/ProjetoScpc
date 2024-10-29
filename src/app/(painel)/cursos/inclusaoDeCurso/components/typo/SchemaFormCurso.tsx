import { z } from 'zod'

const requiredField = 'O campo é obrigatório'
const textField = 'O valor informado deve ser um texto válido'
const numberField = 'O valor informado deve ser um texto válido'
const pdfSchema = z.instanceof(File, {
  message: 'É necessário fazer o upload de um arquivo válido.',
})
// .refine((file) => file.type === 'application/pdf', {
//   message: 'O arquivo deve ser um PDF',
// })

export const listItemSchema = z
  .object({
    value: z.string(),
    title: z.string(),
  })
  .optional()

export const SchemaFormCurso = z.object({
  diretoriaId: z.number(),
  gerenciaId: z.number().optional(),
  nucleoId: z.number().optional(),
  idServidor: z.number(),
  areaDeConhecimento: listItemSchema,
  certificado: pdfSchema,
  tipoDoEvento: listItemSchema,
  modalidadeDoEvento: listItemSchema,
  titulo: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .min(1, 'Título é obrigatório'),
  cargaHoraria: z.number({
    required_error: requiredField,
    invalid_type_error: numberField,
  }),
  nomeInstituicao: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .min(1, 'Instituição é obrigatória'),
  periodo: z.date({
    required_error: 'É necessário selecionar uma data.',
  }),
  periodoFim: z.date({
    required_error: 'É necessário selecionar uma data.',
  }),
  dataCertificacao: z.date({
    required_error: 'É necessário selecionar uma data.',
  }),
  email: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
})

export type FormData = z.infer<typeof SchemaFormCurso>
export const InclusaoformSchema = SchemaFormCurso.superRefine((data, ctx) => {
  const cargaHoraria = data.cargaHoraria
  if (
    cargaHoraria !== undefined &&
    cargaHoraria !== null &&
    cargaHoraria <= 0
  ) {
    ctx.addIssue({
      code: 'custom',
      message: 'Você deve adicionar garga horaria do curso ou evento valida',
      path: ['cargaHoraria'],
    })
  }
})
