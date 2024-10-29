'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { TitlePage } from '@/components/TitlePage'
import { SearchParams } from '@/types'
import permissionsMapping, {
  WarningMessageId,
} from '@/utils/permissionsMapping'
import PecuniaTable from './components/PecuniaTable'
import FolgaTable from './components/FolgaTable'
import { getPecuniaInformations } from '@/app/services/pecuniaService'
import { getFolgasInfosBySituation } from '@/app/services/folgaService'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.pessoaId) {
    return <WarningMessageId />
  }

  const tipoSolicitacao: 'PECUNIA' | 'FOLGA' =
    (searchParams.tipoSolicitacao as 'PECUNIA' | 'FOLGA') || 'PECUNIA'
  const solicitacoesPecuniaPromise = getPecuniaInformations('GGP')
  const solicitacoesFolgaPromise = getFolgasInfosBySituation('GGP')

  return (
    <div className="flex flex-col gap-7 p-6">
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <>
          <TitlePage title="GGP" />
          <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
            {tipoSolicitacao === 'PECUNIA' ? (
              <PecuniaTable solicitacaoPromise={solicitacoesPecuniaPromise} />
            ) : (
              <FolgaTable solicitacaoPromise={solicitacoesFolgaPromise} />
            )}
          </Suspense>
        </>
      )}
    </div>
  )
}
