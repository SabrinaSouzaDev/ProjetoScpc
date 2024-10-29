'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { searchParamsSchema } from '@/lib/validations'
import { SearchParams } from '@/types'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { Table } from './components/Table'
import { solicitarFolgaSubDefensoria } from '@/app/services/server/ScpcServiceServer'
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
  const creditosPromise = solicitarFolgaSubDefensoria(resultSearch)
  return (
    <div className="flex flex-col gap-7 p-6">
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <>
          <TitlePage title="Ciência da SubDefensoria" />
          <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
            <Table creditosPromise={creditosPromise} />
          </Suspense>
        </>
      )}
    </div>
  )
}
