export interface DiaNaoUtilTipo {
  id: number
  descricao: string
}

export interface DiaNaoUtil {
  id: number
  diaNaoUtil: string
  tipoDiaNaoUtil: DiaNaoUtilTipo
}
