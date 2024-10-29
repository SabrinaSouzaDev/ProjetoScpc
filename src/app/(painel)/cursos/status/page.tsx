'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { TitlePage } from '@/components/TitlePage'
import permissionsMapping from '@/utils/permissionsMapping'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { Table } from './components/Table'
import { getCourseRequestByServer } from '@/app/services/courseService'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.pessoaId) {
    return (
      <ErrorMessage
        title="Você não possui credenciais para acessar essa página"
        message="Solicite a administração as suas credenciais de acesso"
      />
    )
  }
  const requestPromise = getCourseRequestByServer(
    Number(session.user?.pessoaId),
  )

  return (
    <>
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <div className="flex flex-col gap-12 p-6">
          <TitlePage title="Status da solicitação - Curso" />

          <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
            <Table requestPromise={requestPromise} />
          </Suspense>
        </div>
      )}
    </>
  )
}
