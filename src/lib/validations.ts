import * as z from 'zod'

const pageObjectSchemeParams = {
  page: z.coerce
    .number()
    .transform((val) => val - 1)
    .default(0)
    .optional(),
  size: z.coerce.number().default(10).optional(),
  direction: z.enum(['ASC', 'DESC']).optional(),
  orderBy: z.array(z.string()).optional(),
  sort: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const splitValues = val.split(',')
        return [
          {
            id: splitValues[0],
            desc: splitValues[1] === 'desc',
          },
        ]
      } else if (Array.isArray(val)) {
        return val.map((item) => ({
          id: item.id,
          desc: !!item.desc,
        }))
      } else {
        return []
      }
    },
    z
      .array(
        z
          .object({
            id: z.string(),
            desc: z.boolean(),
          })
          .required(),
      )
      .optional(),
  ),
  gerenciaId: z.string().optional(),
  nucleoId: z.string().optional(),
  diretoriaId: z.string().optional(),
  situacao: z.string().optional(),
  tipoSolicitacao: z.string().optional(),
}
export const searchParamsSchema = z.object(pageObjectSchemeParams)
