'use server'
import { TitlePage } from '@/components/TitlePage'
import { Table } from './components/Table'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getScaleInfosByDayAndSever } from '@/app/services/scaleService'

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
  const registerScaleReport = getScaleInfosByDayAndSever(session.user.pessoaId)
  return (
    <div className="mt-4 flex flex-col gap-10 p-6">
      <TitlePage title="Cadastro de relatório" />

      <Table registerScaleReport={registerScaleReport} />
    </div>
  )
}
