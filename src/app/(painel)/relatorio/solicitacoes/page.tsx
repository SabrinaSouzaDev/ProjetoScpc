'use server'
import { TitlePage } from '@/components/TitlePage'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getScaleByDay } from '@/app/services/scaleService'
import { Table } from './components/Table'
import { SearchParams } from '@/types'

type status = 'SOLICITADO' | 'INDEFERIDO' | 'DEFERIDO' | 'DEVOLVIDO'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.pessoaId) {
    return (
      <ErrorMessage
        title="Você não possui credenciais para acessar essa página"
        message="Solicite a administração as suas credenciais de acesso"
      />
    )
  }
  const tipoSolicitacao: status =
    (searchParams.status as status) || 'SOLICITADO'
  const registerScaleReport = getScaleByDay(tipoSolicitacao)
  return (
    <div className="mt-4 flex flex-col gap-10 p-6">
      <TitlePage title="Solicitações de Relatório" />

      <Table registerScaleReport={registerScaleReport} />
    </div>
  )
}
