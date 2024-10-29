import { z } from 'zod'

export const userContaSchema = z.object({
  id: z.number().nonnegative(),
  pessoa: z
    .object({
      nomeCompleto: z.string(),
      conta: z
        .array(
          z.object({
            contaId: z.string(),
            agenciaId: z.string(),
            bancoId: z.number().nonnegative(),
            agencia: z.object({
              agenciaId: z.string(),
              bancoId: z.number().nonnegative(),
              banco: z.object({
                id: z.number().nonnegative(),
                nome: z.string(),
              }),
            }),
          }),
        )
        .optional(),
    })
    .optional(),
  matricula: z.string().optional(),
  funcao: z
    .object({
      id: z.number().nonnegative(),
      nome: z.string(),
    })
    .optional(),
})
