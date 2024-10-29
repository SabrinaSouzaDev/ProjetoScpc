import { PutEscalaParams } from '@/app/(painel)/escala/EscalaDePlantaoAdmin/functions/EscalaListFunction'
import { scpcApiFetchClient } from './config'

export async function UpEscalaListFunction(params: PutEscalaParams) {
  const bodyData = JSON.stringify(params)

  console.log('Serialized JSON:', bodyData)

  const resp: Response = await scpcApiFetchClient(`/escala-plantao/status`, {
    method: 'PUT',
    cache: 'no-cache',
    body: bodyData,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })

  const data = await resp.json()
  console.log('API Response:', data)
  return data
}
