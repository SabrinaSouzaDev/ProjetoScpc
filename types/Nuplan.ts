export type NuplanChildrensData = {
  codigo: string
  descricao: string
  numeroPi?: string
  id: number
}

export type NuplanDTO = {
  detalhamentoFonte: NuplanChildrensData[]
  funcaoProgramatica: NuplanChildrensData[]
  gppara: NuplanChildrensData[]
  naturezaDespesa: NuplanChildrensData[]
  planoInterno: NuplanChildrensData[]
  convenio: NuplanChildrensData[]
}
