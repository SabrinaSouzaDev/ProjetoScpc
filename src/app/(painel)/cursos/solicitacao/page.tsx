'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { TitlePage } from '@/components/TitlePage'
import permissionsMapping from '@/utils/permissionsMapping'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { Table } from './components/Table'
import { getCourses } from '@/app/services/courseService'
import { searchParamsSchema } from '@/lib/validations'
import { SearchParams } from '@/types'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.pessoaId) {
    return (
      <ErrorMessage
        title="Você não possui credenciais para acessar essa página"
        message="Solicite a administração as suas credenciais de acesso"
      />
    )
  }
  const situacao: 'SOLICITADO' | 'INDEFERIDO' | 'DEFERIDO' =
    (searchParams.situacao as 'SOLICITADO' | 'INDEFERIDO' | 'DEFERIDO') ||
    'SOLICITADO'
  const resultSearch = searchParamsSchema.parse(searchParams)
  const requestPromise = getCourses(situacao, resultSearch)

  return (
    <>
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <div className="flex flex-col gap-7 p-6">
          <TitlePage title="Cursos aptos à aprovação" />

          <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
            <Table requestPromise={requestPromise} />
          </Suspense>
        </div>
      )}
    </>
  )
}
