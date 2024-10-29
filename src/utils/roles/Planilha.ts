import { ObjectUtils } from '@/utils/ObjectUtils'

export enum Planilha {
  TRANSPARENCIA = 'TRANSPARENCIA_ANEXO',
  INSTITUCIONAL = 'INTRANET_INSTITUCIONAL',
  DEFENSOR = 'DEFENSOR',
  CORREGEDOR = 'CORREGEDOR',
  SERVIDOR = 'SERVIDOR',
}

export const PLANILHA_VALUES = ObjectUtils.getEnumKeys(Planilha)
