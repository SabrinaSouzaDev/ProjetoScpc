import { RefinementCtx } from 'zod'
import { FormData } from '../schemas/formSchema' // Ajuste o caminho conforme necessário

// Definição do contexto de superRefine
type SuperRefineContext = RefinementCtx

// Mensagens de erro constantes
export const MSG_DATA_VAZIA = 'Não é permitido data vazia'
export const MSG_MARQUE_SOMENTE_UM = 'Marque somente um'

export const MSG_PESO_PLANTAO = 'O peso do plantão é obrigatório.'

// Definição do tipo das folgas
type Folga = {
  dataDoPlantao?: Date
  dataUtilizada?: Date
}

export type PlantaoAdd = {
  dataPlantao?: Date
  pesoPlantao?: number
  pesoMeio?: boolean
  pesoDois?: boolean
  pesoUm?: boolean
}

// Função para validar folgas
export function validateFolgas(data: FormData, ctx: SuperRefineContext) {
  data.folgas.forEach((value: Folga, index: number) => {
    if (value.dataUtilizada === undefined || 0) {
      ctx.addIssue({
        code: 'custom',
        message: MSG_DATA_VAZIA,
        path: [`folgas.${index}.dataUtilizada`],
      })
    }
    if (value.dataDoPlantao === undefined) {
      ctx.addIssue({
        code: 'custom',
        message: MSG_DATA_VAZIA,
        path: [`folgas.${index}.dataDoPlantao`],
      })
    }
  })
}

export function validatePlantaoAdd(data: FormData, ctx: SuperRefineContext) {
  data.plantaoAdd.forEach((value: PlantaoAdd, index: number) => {
    if (value.dataPlantao === undefined || null) {
      ctx.addIssue({
        code: 'custom',
        message: MSG_DATA_VAZIA,
        path: [`plantaoAdd.${index}.dataPlantao`],
      })
    }
    if (value.pesoPlantao === undefined || null || '') {
      ctx.addIssue({
        code: 'custom',
        message: MSG_PESO_PLANTAO,
        path: [`plantaoAdd.${index}.pesoPlantao`],
      })
    }
  })
}

// Função para validar plantão
export function validatePlantao(data: FormData, ctx: SuperRefineContext) {
  if (data.fimPlantao === undefined) {
    ctx.addIssue({
      code: 'custom',
      message: MSG_DATA_VAZIA,
      path: ['fimPlantao'],
    })
  }
  if (data.inicioPlantao === undefined) {
    ctx.addIssue({
      code: 'custom',
      message: MSG_DATA_VAZIA,
      path: ['inicioPlantao'],
    })
  }
}

// Função para validar conversão para pecúnia e prescrição
export function validateConverterPecuniaPrescrito(
  data: FormData,
  ctx: SuperRefineContext,
) {
  if (
    (data.converterPecunia === undefined && data.decaido === undefined) ||
    (data.converterPecunia && data.decaido)
  ) {
    ctx.addIssue({
      code: 'custom',
      message: MSG_MARQUE_SOMENTE_UM,
      path: ['converterPecunia'],
    })
    ctx.addIssue({
      code: 'custom',
      message: MSG_MARQUE_SOMENTE_UM,
      path: ['decaido'],
    })
  }
}
