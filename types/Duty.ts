import { CreditoDTO } from "./Credito"

export interface Duty {
  id: number
  idServidor: number
  nomeServidor: string
  inicioPlantao: string
  fimPlantao: string
  creditosGerados: CreditoDTO[]
  createdDate: string
}