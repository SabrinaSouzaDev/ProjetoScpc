'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { consultaAprovarSolicitacaoFolga } from '@/app/services/server/ServiceAprovarFolga'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { searchParamsSchema } from '@/lib/validations'
import { SearchParams } from '@/types'
import permissionsMapping, {
  WarningMessageId,
} from '@/utils/permissionsMapping'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { Table } from './components/Table'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.pessoaId) {
    return <WarningMessageId />
  }

  const nucleoId = Number(session?.user?.nucleoId)
  if (isNaN(nucleoId)) {
    return (
      <ErrorMessage
        message="Sem lotação em uma coordenadoria"
        title="Verifique a coordenadoria que pertence com o respectivo responsável"
      />
    )
  }
  const diretoriaId = Number(session?.user?.diretoriaId)
  if (isNaN(diretoriaId)) {
    return (
      <ErrorMessage
        message="Sem lotação em uma diretoria"
        title="Verifique a diretoria que pertence com o respectivo responsável"
      />
    )
  }
  const gerenciaId = Number(session?.user?.gerenciaId)

  searchParams.nucleoId = String(session?.user?.nucleoId)
  const resultSearch = searchParamsSchema.parse(searchParams)

  const situacao = 'COORDENADORIA'
  const solicitacaoFolgaPromise = consultaAprovarSolicitacaoFolga(
    situacao,
    diretoriaId,
    nucleoId,
    gerenciaId ?? undefined,
    resultSearch,
  )

  return (
    <div className="p-4">
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <>
          <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
            <Table folgaPromise={solicitacaoFolgaPromise} />
          </Suspense>
        </>
      )}
    </div>
  )
}
