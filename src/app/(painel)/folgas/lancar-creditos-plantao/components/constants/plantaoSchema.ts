import { z } from 'zod'

export const plantaoSchema = z.object({
  dataPlantao: z
    .date({
      required_error: 'A data do plantão é obrigatória.',
    })
    .optional(),
  pesoPlantao: z
    .number({
      required_error: 'O peso do plantão é obrigatório.',
    })
    .nonnegative('O peso deve ser um número positivo')
    .max(10, 'O peso deve ser no máximo 10')
    .optional(),
  processo: z.string().optional(),
})
