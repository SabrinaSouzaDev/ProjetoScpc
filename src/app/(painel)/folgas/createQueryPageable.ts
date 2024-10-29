import { SolicitacaoFolgaParams } from '@/types/Folga'

export function createQueryPageablec(
  params: SolicitacaoFolgaParams = {},
): string {
  const queryParams: string[] = []

  if (params.diretoriaId !== undefined) {
    queryParams.push(`diretoriaId=${params.diretoriaId}`)
  }
  if (params.nucleoId !== undefined) {
    queryParams.push(`nucleoId=${params.nucleoId}`)
  }
  if (params.gerenciaId !== undefined) {
    queryParams.push(`gerenciaId=${params.gerenciaId}`)
  }
  if (params.page !== undefined) {
    queryParams.push(`page=${params.page}`)
  }
  if (params.size !== undefined) {
    queryParams.push(`size=${params.size}`)
  }
  if (params.direction) {
    queryParams.push(`direction=${params.direction}`)
  }
  if (params.orderBy && params.orderBy.length > 0) {
    queryParams.push(`orderBy=${params.orderBy.join(',')}`)
  }

  return queryParams.join('&')
}
