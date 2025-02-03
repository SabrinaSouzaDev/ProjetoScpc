'use server'
// import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
// import { consultaCreditosServidor } from '@/app/services/server/ScpcServiceServer'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import Table from './components/Table'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { searchParamsSchema } from '@/lib/validations'
import { WarningMessageId } from '@/utils/permissionsMapping'
import { SearchParams } from '../../../../../types'
import { TitlePage } from '@/components/TitlePage'

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
  function permissionsMapping(arg0: any): React.ReactNode {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="flex flex-col gap-7 p-6">
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc?.roles || undefined,
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
function consultaCreditosServidor(pessoaId: any, arg1: string, resultSearch: any) {
  throw new Error('Function not implemented.')
}

