import { z } from 'zod'

const requiredField = 'O campo é obrigatório'
const numericalField = 'O valor informado deve ser numérico'

export const nuplanFormSchema = z.object({
  funcaoProgramaticaId: z.number({
    required_error: requiredField,
    invalid_type_error: numericalField,
  }),
  gpparaId: z.number({
    required_error: requiredField,
    invalid_type_error: numericalField,
  }),
  convenioId: z.number({
    required_error: requiredField,
    invalid_type_error: numericalField,
  }),
  detalhamentoFonteId: z.number({
    required_error: requiredField,
    invalid_type_error: numericalField,
  }),
  naturezaDespesaId: z.number({
    required_error: requiredField,
    invalid_type_error: numericalField,
  }),
  planoInternoId: z.number({
    required_error: requiredField,
    invalid_type_error: numericalField,
  }),
})
