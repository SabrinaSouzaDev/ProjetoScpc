'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import { Table } from './components/Table'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { TitlePage } from '@/components/TitlePage'
import permissionsMapping, {
  WarningMessageId,
} from '@/utils/permissionsMapping'
import { consultaCreditosServidor } from '@/app/services/server/ScpcServiceServer'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.pessoaId) {
    return <WarningMessageId />
  }
  const ServidorId = session.user.pessoaId
  const solicitacoesPromise = consultaCreditosServidor(
    session?.user?.pessoaId,
    'GERAL',
  )
  const userSessionData = {
    nucleId: session.user.nucleoId,
    gerenciaId: session.user.gerenciaId,
    diretoria: session.user.diretoriaId,
  }

  return (
    <div className="flex flex-col gap-7 p-6">
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <>
          <TitlePage title="Créditos aptos à Pecúnia" />
          <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
            <Table
              ServidorId={ServidorId}
              pecuniaPromise={solicitacoesPromise}
              diretoriaId={userSessionData.diretoria}
              gerenciaId={userSessionData.gerenciaId}
              nucleoId={userSessionData.nucleId}
            />
          </Suspense>
        </>
      )}
    </div>
  )
}
