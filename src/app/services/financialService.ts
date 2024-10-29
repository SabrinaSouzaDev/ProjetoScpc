import { scpcApiFetchClient } from './client/config'

export async function getFinancialAnnex(servidorId: number) {
  const resp: Response = await scpcApiFetchClient(
    `/relatorio/relatorio-financeiro/anexo-financeiro/${servidorId}`,
    {
      method: 'POST',
      cache: 'no-cache',
    },
  )

  return URL.createObjectURL(await resp.blob())
}

export async function updateFinancialRequest(params: FormData) {
  const resp: Response = await scpcApiFetchClient(
    `/solicitacao-pecunia/atualizacao-financeiro`,
    {
      method: 'PUT',
      cache: 'no-cache',
      body: params,
    },
  )

  return resp.json()
}

export async function postFinancialAnnex(ids: number[], params: FormData) {
  const resp: Response = await scpcApiFetchClient(
    `/solicitacao-pecunia/atualizacao-financeiro-arquivo?ids=${ids}`,
    {
      method: 'PUT',
      cache: 'no-cache',
      body: params,
    },
  )

  return resp.json()
}
