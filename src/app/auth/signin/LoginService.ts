import { apiFetch } from '@/app/api/apiFetch'
import { apiAddress } from '@/app/api/apiOptions'

export async function iExist(): Promise<void> {
  const resp: Promise<void> = apiFetch(apiAddress + '/usuario/iExist', {
    method: 'POST',
    cache: 'no-cache',
  })
    .then((r) => r.json())
    .catch(() => 'undefined')
  return resp
}
