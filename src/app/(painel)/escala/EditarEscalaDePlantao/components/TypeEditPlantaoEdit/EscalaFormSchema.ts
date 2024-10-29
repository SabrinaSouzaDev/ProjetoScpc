import { z } from 'zod'

// Schemas for subtypes
export const DiaSchema = z.object({
  id: z.number().optional(),
  dia: z.string().optional(),
})

export const EscalaEditFormSchema = z.object({
  id: z.number(),
  tipo: z.string().nullable(),
  diretoria: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .nullable(),
  nucleo: z
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
  escalasPlantaoDias: z
    .array(
      z.object({
        id: z.number().optional().nullable(),
        servidorId: z
          .object({
            id: z.number().optional(),
            nome: z.string().optional().nullable(),
          })
          .optional(),
        // Adicionando os campos relatorioDescricao, observacaoDia, e dia
        dia: DiaSchema.optional().nullable(),
      }),
    )
    .optional(),
})
