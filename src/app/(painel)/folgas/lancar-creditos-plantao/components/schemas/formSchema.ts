import { z } from 'zod'
import {
  validateConverterPecuniaPrescrito,
  validateFolgas,
  validatePlantao,
  validatePlantaoAdd,
  // validatePlantaoAdd,
} from '../util/SuperRefine'
import { plantaoSchema } from '../constants/plantaoSchema'

export const formSchemaBase = z.object({
  diretoriaId: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .nullable(),
  nucleoId: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .nullable(),
  gerenciaId: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .nullable(),
  servidor: z.object({
    id: z.number(),
    pessoa: z.object({
      nomeCompleto: z.string(),
    }),
  }),
  saldo: z
    .number({
      coerce: true,
    })
    .refine((value) => value !== undefined && value !== null, {
      message: 'Consulte novamente',
    }),
  folgas: z.array(
    z.object({
      dataDoPlantaoMeio: z
        .date({ required_error: 'É necessário selecionar uma data.' })
        .optional(),
      dataDoPlantao: z
        .date({
          required_error: 'É necessário selecionar uma data.',
        })
        .optional(),
      dataUtilizada: z
        .date({
          required_error: 'É necessário selecionar uma data.',
        })
        .optional(),
      requerimento: z.string().optional(),
    }),
  ),
  inicioPlantao: z
    .date({
      required_error: 'É necessário selecionar uma data.',
    })
    .optional(),
  fimPlantao: z
    .date({
      required_error: 'É necessário selecionar uma data.',
    })
    .optional(),
  decaido: z.boolean({
    required_error: 'Obrigatório.',
  }),
  converterPecunia: z.boolean({
    required_error: 'Obrigatório',
  }),
  plantaoAdd: z.array(plantaoSchema),
})

// Definição do tipo dos dados do formulário
export type FormData = z.infer<typeof formSchemaBase>

export const formSchema = formSchemaBase.superRefine((data, ctx) => {
  validateFolgas(data, ctx)
  validatePlantao(data, ctx)
  validateConverterPecuniaPrescrito(data, ctx)
  validatePlantaoAdd(data, ctx)

  // Validação adicional de saldo
  const saldo = data.saldo

  // Permitir saldo -0.5 e certificar-se de que o número de folgas não exceda o saldo
  const saldoPermitido = saldo === -0.5
  // || data.folgas.length <= Math.floor(saldo)

  if (saldoPermitido) {
    ctx.addIssue({
      code: 'custom',
      message: 'Você deve adicionar mais folgas ou remover folgas selecionadas',
      path: ['saldo'],
    })
  }
})
