import { scpcApiFetchClient } from './client/config'

export async function getHolidays() {
  const resp: Response = await scpcApiFetchClient(`/dia_nao_util/list`, {
    method: 'GET',
    cache: 'no-cache',
  })
  return await resp.json()
}
