import { ObjectUtils } from '@/utils/ObjectUtils'

export enum Anexo {
  NOTICIAS = 'NOTICIAS_ANEXO',
  TRANSPARENCIA = 'TRANSPARENCIA_ANEXO',
  ADMIN = 'ANEXO_ADMIN',
}

export const ANEXO_VALUES = ObjectUtils.getEnumKeys(Anexo)
