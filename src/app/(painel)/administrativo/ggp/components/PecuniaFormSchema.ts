import { z } from 'zod'

const requiredField = 'O campo é obrigatório'
const numericalField = 'O valor informado deve ser numérico'

export const pecuniaFormSchema = z.object({
  numeroEmpenho: z
    .number({
      required_error: requiredField,
      invalid_type_error: numericalField,
    })
    .min(0, { message: 'O número deve ser no mínimo 0' })
    .max(100, { message: 'O número deve ser no máximo 100' }),

  ob: z
    .number({
      required_error: requiredField,
      invalid_type_error: numericalField,
    })
    .min(0, { message: 'O número deve ser no mínimo 0' })
    .max(100, { message: 'O número deve ser no máximo 100' }),

  liquidacao: z
    .number({
      required_error: requiredField,
      invalid_type_error: numericalField,
    })
    .min(0, { message: 'O número deve ser no mínimo 0' })
    .max(100, { message: 'O número deve ser no máximo 100' }),

  anexoFinanceiro: z.instanceof(File, {
    message: 'É necessário fazer o upload de um arquivo válido.',
  }),
})
