'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import { Table } from './components/Table'
import { consultaCreditosServidor } from '@/app/services/server/ScpcServiceServer'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { SearchParams } from '@/types'
import { searchParamsSchema } from '@/lib/validations'
import { TitlePage } from '@/components/TitlePage'
import permissionsMapping, {
  WarningMessageId,
} from '@/utils/permissionsMapping'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.pessoaId) {
    return <WarningMessageId />
  }
  const resultSearch = searchParamsSchema.parse(searchParams)
  const creditosFolgasPromise = consultaCreditosServidor(
    session?.user?.pessoaId,
    'FOLGA',
    resultSearch,
  )
  return (
    <div className="flex flex-col gap-7 p-6">
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <>
          <TitlePage title="Créditos aptos à Folga" />

          <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
            <Table creditosFolgasPromise={creditosFolgasPromise} />
          </Suspense>
        </>
      )}
    </div>
  )
}
