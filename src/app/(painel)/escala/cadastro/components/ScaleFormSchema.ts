import { z } from 'zod'

const requiredField = 'O campo é obrigatório'
const textField = 'O valor informado deve ser um texto válido'
const numberField = 'O valor informado deve ser um texto válido'

export const scaleFormSchema = z.object({
  tipo: z
    .string({
      required_error: requiredField,
      invalid_type_error: textField,
    })
    .min(1, 'Tipo é obrigatório'),
  diretoriaId: z.number({
    required_error: requiredField,
    invalid_type_error: numberField,
  }),
  nucleoId: z
    .number({
      invalid_type_error: numberField,
    })
    .optional(),
  gerenciaId: z
    .number({
      invalid_type_error: numberField,
    })
    .optional(),
  idDia: z.number({
    required_error: requiredField,
    invalid_type_error: numberField,
  }),
  idServidor: z.number({
    required_error: requiredField,
    invalid_type_error: numberField,
  }),
})
