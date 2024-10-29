import { z } from 'zod'

const requiredField = 'O campo é obrigatório'
const textField = 'O valor informado deve ser um texto válido'
const numberField = 'O valor informado deve ser um texto válido'

export const courseFormSchema = z.object({
  areaDeConhecimento: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .min(1, 'Área de Conhecimento é obrigatória'),
  tipoDoEvento: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .min(1, 'Tipo do Evento é obrigatório'),
  modalidadeDoEvento: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .min(1, 'Modalidade do Evento é obrigatória'),
  titulo: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .min(1, 'Título é obrigatório'),
  cargaHoraria: z
    .number({
      required_error: requiredField,
      invalid_type_error: numberField,
    })
    .nullable(),
  instituicao: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .min(1, 'Instituição é obrigatória'),
  periodo: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .min(1, 'Período é obrigatório'),
  periodoFim: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .min(1, 'Período Fim é obrigatório'),
  dataCertificacao: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .min(1, 'Data de Certificação é obrigatória'),
  email: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
})

export type FormData = z.infer<typeof courseFormSchema>
export const formSchema = courseFormSchema.superRefine((data, ctx) => {
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
