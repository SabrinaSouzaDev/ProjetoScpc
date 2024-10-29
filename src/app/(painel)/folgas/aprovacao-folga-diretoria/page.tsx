'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { WarningMessageId } from '@/utils/permissionsMapping'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { Table } from './components/Table'
import { searchParamsSchema } from '@/lib/validations'
import { SearchParams } from '@/types'
import { consultaAprovarSolicitacaoFolga } from '@/app/services/server/ServiceAprovarFolga'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.pessoaId) {
    return <WarningMessageId />
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

  const nucleoId = Number(session?.user?.nucleoId)
  const gerenciaId = Number(session?.user?.gerenciaId)

  searchParams.diretoriaId = String(session?.user?.diretoriaId)
  const resultSearch = searchParamsSchema.parse(searchParams)

  const situacao = 'DIRETORIA'
  const solicitacaoFolgaPromise = consultaAprovarSolicitacaoFolga(
    situacao,
    diretoriaId,
    nucleoId ?? undefined,
    gerenciaId ?? undefined,
    resultSearch,
  )

  return (
    <div className="p-4">
      <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
        <Table folgaPromise={solicitacaoFolgaPromise} />
      </Suspense>
    </div>
  )
}
