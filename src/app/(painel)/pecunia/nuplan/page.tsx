'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { TitlePage } from '@/components/TitlePage'
import permissionsMapping from '@/utils/permissionsMapping'
import { getPecuniaInformations } from '@/app/services/pecuniaService'
import { Table } from './components/Table'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'

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
  const pecuniaPromise = getPecuniaInformations('NUPLAN')

  return (
    <div className="flex flex-col gap-7 p-6">
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <>
          <TitlePage title="Nuplan" />
          <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
            <Table pecuniaPromise={pecuniaPromise} />
          </Suspense>
        </>
      )}
    </div>
  )
}
