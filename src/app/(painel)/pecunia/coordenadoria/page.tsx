'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton'
import { TitlePage } from '@/components/TitlePage'
import permissionsMapping from '@/utils/permissionsMapping'
import { Table } from './components/Table'
import { getPecuniaInformations } from '@/app/services/pecuniaService'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.pessoaId) {
    return (
      <ErrorMessage
        title="Você não possui credenciais para acessar essa página"
        message="Solicite a administração as suas credenciais de acesso"
      />
    )
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
  const pecuniaPromise = getPecuniaInformations(
    'COORDENADORIA',
    diretoriaId,
    nucleoId,
    undefined,
  )

  return (
    <div className="flex flex-col gap-7 p-6">
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <>
          <TitlePage title="Aprovar Pecúnia - Coordenadoria" />
          <Suspense fallback={<DataTableSkeleton columnCount={3} />}>
            <Table pecuniaPromise={pecuniaPromise} />
          </Suspense>
        </>
      )}
    </div>
  )
}
