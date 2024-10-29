import { z } from 'zod'

export const formSchemaCreditoEscola = z.object({
  diretoria: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .nullable(),
  coordenadoria: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .nullable(),
  gerencia: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .nullable(),
  servidor: z.object({
    id: z.number(),
    matricula: z.string(),
    pessoa: z.object({
      nomeCompleto: z.string(),
    }),
  }),
  creditos: z
    .number()
    .positive('O número deve ser positivo')
    .int('O número deve ser um inteiro'),
})
