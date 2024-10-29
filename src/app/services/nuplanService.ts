import { NuplanDTO } from '@/types/Nuplan'
import { scpcApiFetchClient } from './client/config'

type updateNuplanInfosType = {
  idSolicitacaoPecunia: number
  funcaoProgramaticaId: number
  gpparaId: number
  convenioId: number
  detalhamentoFonteId: number
  naturezaDespesaId: number
  planoInternoId: number
}

export async function getNuplanData(): Promise<NuplanDTO> {
  const resp: Response = await scpcApiFetchClient(`/nuplan`, {
    method: 'GET',
    cache: 'no-cache',
  })
  return await resp.json()
}

export async function updateNuplanInfosRequest(params: updateNuplanInfosType) {
  const resp: Response = await scpcApiFetchClient(
    `/solicitacao-pecunia/atualizacao-nuplan`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      cache: 'no-cache',
      body: JSON.stringify(params),
    },
  )

  return resp.json()
}
