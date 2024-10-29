import { ObjectUtils } from '@/utils/ObjectUtils'

export enum Gerencia {
  ADMIN = 'ADMIN',
  authorization = 'uma_authorization',
  ADMIN_RELATORIO = 'ADMIN_RELATORIO',
  ANEXO_ADMIN = 'ANEXO_ADMIN',
}

export const GERENCIA_VALUES = ObjectUtils.getEnumKeys(Gerencia)
