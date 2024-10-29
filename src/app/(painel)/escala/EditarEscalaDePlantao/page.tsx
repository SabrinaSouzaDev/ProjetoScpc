'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { consultaEditarSolicitacaoEscalaPlantao } from '@/app/services/server/EscalaPlantaoEditGet'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { TitlePage } from '@/components/TitlePage'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
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
  searchParams.nucleoId = String(session?.user?.nucleoId)
  // const resultSearch = searchParamsSchema.parse(searchParams)
  const situacao = 'DIRETORIA'
  const status = 'DEVOLVIDO'
  try {
    const solicitacaoEscalaPromise = consultaEditarSolicitacaoEscalaPlantao(
      situacao,
      diretoriaId,
      status ?? undefined,
      nucleoId ?? undefined,
      gerenciaId ?? undefined,
    )

    return (
      <div className="p-10">
        {permissionsMapping(
          session?.user?.resourceAccess?.scpc.roles || undefined,
        ) || (
          <>
            <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
              <div className="mt-4 flex flex-col gap-10 p-6">
                <TitlePage title="Histórico da escala de plantão" />
                <Table EscalaEditPromise={solicitacaoEscalaPromise} />
              </div>
            </Suspense>
          </>
        )}
      </div>
    )
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
    return (
      <ErrorMessage
        message="Ocorreu um erro ao buscar os dados."
        title="Erro de requisição"
      />
    )
  }
}
