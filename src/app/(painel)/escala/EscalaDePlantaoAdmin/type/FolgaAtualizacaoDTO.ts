export type FolgaAtualizacaoDTO = {
  id: number
  dataFolga: Date
  dataCredito?: Date
  status: string
  situacao: string
  indeferir: boolean
  cancelar: boolean
}

export type FolgaAprovarUpdateDTO = {
  id: number
  status: string
  situacao: string
  indeferir: boolean
  cancelar: boolean
}
