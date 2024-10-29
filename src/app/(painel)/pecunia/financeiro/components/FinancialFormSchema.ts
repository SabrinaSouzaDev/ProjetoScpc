import { z } from 'zod'

const requiredField = 'O campo é obrigatório'
const numericalField = 'O valor informado deve ser numérico'

export const financialFormSchema = z.object({
  numeroEmpenho: z
    .number({
      required_error: requiredField,
      invalid_type_error: numericalField,
    })
    .min(0, { message: 'O número deve ser no mínimo 0' })
    .max(99999999, { message: 'O valor máximo não deve exceder oito digitos' }),

  ob: z
    .number({
      required_error: requiredField,
      invalid_type_error: numericalField,
    })
    .min(0, { message: 'O número deve ser no mínimo 0' })
    .max(99999999, { message: 'O valor máximo não deve exceder oito digitos' }),

  liquidacao: z
    .number({
      required_error: requiredField,
      invalid_type_error: numericalField,
    })
    .min(0, { message: 'O número deve ser no mínimo 0' })
    .max(99999999, { message: 'O valor máximo não deve exceder oito digitos' }),
})
