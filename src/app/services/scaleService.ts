import { CreateScale, ScaleInfos } from '@/types/Scale'
import { scpcApiFetchClient } from './client/config'
import { scpcApiFetchServer } from './server/config'
import { PageInterface } from '@/types/PageInterface'
import { EscalaPlantao } from '../(painel)/escala/EditarEscalaDePlantao/components/TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'

export async function getScaleByDay(
  situacao: string,
): Promise<PageInterface<ScaleInfos>> {
  const resp: Response = await scpcApiFetchServer(
    `/escala-plantao-dia?status=${situacao}`,
    {
      method: 'GET',
      cache: 'no-cache',
    },
  )
  return await resp.json()
}

export async function getScaleInfosByDayAndSever(
  id: number,
): Promise<PageInterface<ScaleInfos>> {
  const resp: Response = await scpcApiFetchServer(
    `/escala-plantao-dia/servidor/${id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    },
  )
  return await resp.json()
}

export async function createScaleSchedule(params: CreateScale) {
  const { idDia, diretoriaId, idServidor, tipo, gerenciaId, nucleoId } = params
  const resp: Response = await scpcApiFetchClient(`/escala-plantao`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      idServidor,
      diretoriaId,
      nucleoId: nucleoId || undefined,
      gerenciaId: gerenciaId || undefined,
      tipo,
      escalaPlantaoDia: [
        {
          idDia,
          servidorId: idServidor,
        },
      ],
    }),
  })
  return resp.json()
}

export async function createMultipleScaleSchedule(params: CreateScale) {
  const { escalaPlantaoDia, diretoriaId, tipo, gerenciaId, nucleoId } = params
  const resp: Response = await scpcApiFetchClient(`/escala-plantao`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      diretoriaId,
      nucleoId: nucleoId || undefined,
      gerenciaId: gerenciaId || undefined,
      tipo,
      escalaPlantaoDia,
    }),
  })
  return resp.json()
}

export async function updateScaleInfos(id: number, relatorioDescricao: string) {
  const resp: Response = await scpcApiFetchClient(
    `/escala-plantao-dia/prestar-contas`,
    {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id,
        relatorioDescricao,
      }),
    },
  )
  return resp.json()
}

export async function updateEscalaId(
  id: number,
): Promise<PageInterface<EscalaPlantao>> {
  const resp: Response = await scpcApiFetchServer(`/escala-plantao-dia/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  })
  return await resp.json()
}

export async function updateReportStatus(
  id: number,
  status: string,
  observacaoDia?: string,
) {
  const resp: Response = await scpcApiFetchClient(
    `/escala-plantao-dia/status`,
    {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id,
        status,
        observacaoDia: observacaoDia || undefined,
      }),
    },
  )
  return resp.json()
}
