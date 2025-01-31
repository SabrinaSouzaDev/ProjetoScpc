export type Credito = {
  servidorId: number
  numeroFolgas: number
}

export type CreditoD = {
  servidorId: number
  numeroFolgas: number
  inicioPlantao?: string
  fimPlantao?: string
  prescrito?: boolean // Adicionando a propriedade prescrito
  aptoParaPecunia?: boolean
}
