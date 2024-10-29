'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import Table from './components/Table'
import { TitlePage } from '@/components/TitlePage'
import { getRequestsFromUser } from '@/app/services/statusService'
import { searchParamsSchema } from '@/lib/validations'
import { SearchParams } from '@/types'
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

  const tipoFuncionario: 'PECUNIA' | 'FOLGA' =
    (searchParams.tipoFuncionario as 'PECUNIA' | 'FOLGA') || 'PECUNIA'
  const resultSearch = searchParamsSchema.parse(searchParams)
  const solicitacoesPromise = getRequestsFromUser(
    tipoFuncionario,
    session?.user?.pessoaId,
    resultSearch,
  )

  return (
    <div className="flex flex-col gap-7 p-6">
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <>
          <TitlePage title="Solicitação do Servidor" />
          <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
            <Table solicitacaoPromise={solicitacoesPromise} />
          </Suspense>
        </>
      )}
    </div>
  )
}
