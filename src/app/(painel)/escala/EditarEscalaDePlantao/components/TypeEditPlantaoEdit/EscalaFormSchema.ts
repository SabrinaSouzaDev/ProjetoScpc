import { z } from 'zod'
// Schemas for subtypes
// const ServidorSchema = z.object({
//   id: z.number().optional(), // ID do servidor opcional
//   nome: z.string().nullable().optional(), // Nome pode ser string ou null
// })

// const DiaSchema = z.object({
//   id: z.number().optional(),
//   dia: z.string().nullable().optional(),
// })

// const EscalaSchema = z.object({
//   id: z.number().nullable().optional(),
//   servidorId: ServidorSchema.nullable().optional(),
//   relatorioDescricao: z.string().nullable().optional(),
//   observacaoDia: z.string().nullable().optional(),
//   dia: DiaSchema.nullable().optional(),
// })
export const EscalaEditFormSchema = z.object({
  id: z.number(),
  tipo: z.string(),
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
    .nullable()
    .optional(),
  gerencia: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .nullable()
    .optional(),
  escalasPlantaoDias: z
    .array(
      z
        .object({
          id: z.number().nullable().optional(),
          servidorId: z
            .object({
              id: z.number().nullable().optional(), // Aceita null ou undefined
              nome: z.string().nullable().optional(),
            })
            .nullable()
            .optional(), // Aceita servidorId como null ou undefined
          relatorioDescricao: z.string().optional(),
          observacaoDia: z.string().optional(),
          dia: z
            .object({
              id: z.number().nullable().optional().nullable(),
              dia: z.string().nullable().optional().nullable(),
            })
            .nullable()
            .optional(),
        })
        .optional()
        .nullable(),
    )
    .nullable()
    .optional(),
})
