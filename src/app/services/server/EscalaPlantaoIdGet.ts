import { PageableProps } from '@/types/PageableProps'
import { PageInterface } from '@/types/PageInterface'
import { ObjectUtils } from '@/utils/ObjectUtils'
import { scpcApiFetchServer } from './config'
import { EscalaPlantao } from '@/app/(painel)/escala/EscalaDePlantaoAdmin/type/AprovarEscalaPlatao'

export async function getRequestsEscalaPlantaoEdit(
  id: number,
  params?: PageableProps,
): Promise<PageInterface<EscalaPlantao>> {
  const stringPageableParams = ObjectUtils.createQueryPageable(params)
  const resp: Response = await scpcApiFetchServer(
    `/escala-plantao/${id}&${stringPageableParams}`,
    {
      method: 'GET',
      cache: 'no-cache',
    },
  )
  return await resp.json()
}
