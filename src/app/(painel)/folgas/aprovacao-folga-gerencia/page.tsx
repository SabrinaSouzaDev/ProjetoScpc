'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { consultaAprovarSolicitacaoFolga } from '@/app/services/server/ServiceAprovarFolga'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import permissionsMapping, {
  WarningMessageId,
} from '@/utils/permissionsMapping'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { Table } from './components/Table'
import { searchParamsSchema } from '@/lib/validations'
import { SearchParams } from '@/types'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.pessoaId) {
    return <WarningMessageId />
  }
  const gerenciaId = Number(session?.user?.gerenciaId)
  if (isNaN(gerenciaId)) {
    return (
      <ErrorMessage
        message="Sem lotação em uma gerência"
        title="Verifique a sua gerência com o respectivo responsável"
      />
    )
  }
  const diretoriaId = Number(session?.user?.diretoriaId)
  if (isNaN(diretoriaId)) {
    return <ErrorMessage message="fsdf" title="fdsfs" />
  }
  const nucleoId = Number(session?.user?.nucleoId)

  searchParams.gerenciaId = gerenciaId.toString()
  const resultSearch = searchParamsSchema.parse(searchParams)

  const situacao = 'GERENCIA'
  const solicitacaoFolgaPromise = consultaAprovarSolicitacaoFolga(
    situacao,
    diretoriaId,
    nucleoId ?? undefined,
    gerenciaId,
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
