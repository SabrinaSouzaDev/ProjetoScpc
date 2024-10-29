import { PageInterface } from '@/types/PageInterface'
import { scpcApiFetchServer } from './server/config'
import { CourseContentDTO, UpdateCourse } from '@/types/Course'
import { scpcApiFetchClient } from './client/config'
import { ObjectUtils } from '@/utils/ObjectUtils'
import { PageableProps } from '@/types/PageableProps'

export async function getCourses(
  situacao?: 'SOLICITADO' | 'DEFERIDO' | 'INDEFERIDO',
  params?: PageableProps,
): Promise<PageInterface<CourseContentDTO>> {
  const stringPageableParams = ObjectUtils.createQueryPageable(params)
  const resp: Response = await scpcApiFetchServer(
    `/capacitacao?situacao=${situacao || 'SOLICITADO'}&${stringPageableParams}`,
    {
      method: 'GET',
      cache: 'no-cache',
    },
  )
  return await resp.json()
}

export async function getCourseRequestByServer(
  id: number,
): Promise<PageInterface<CourseContentDTO>> {
  const resp: Response = await scpcApiFetchServer(
    `/capacitacao/servidor/${id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    },
  )
  return await resp.json()
}

export async function updateCourseStatus({
  id,
  cargaHorariaAceita,
  observacao,
  situacao,
}: UpdateCourse) {
  const resp: Response = await scpcApiFetchClient(`/capacitacao/situacao`, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    method: 'PUT',
    cache: 'no-cache',
    body: JSON.stringify({
      id,
      cargaHorariaAceita,
      observacao,
      situacao,
    }),
  })
  return resp.json()
}
