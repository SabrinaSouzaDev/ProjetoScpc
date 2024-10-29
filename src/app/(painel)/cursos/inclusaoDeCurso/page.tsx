/* eslint-disable @typescript-eslint/no-unused-vars */
import { TitlePage } from '@/components/TitlePage'
import Form from './components/Form'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { number } from 'zod'

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
  const diretoriaId = session?.user?.diretoriaId
    ? Number(session?.user?.diretoriaId)
    : Number(session?.user?.diretoriaId)
  const gerenciaId = session?.user?.gerenciaId
    ? Number(session?.user?.gerenciaId)
    : undefined
  const nucleoId = session?.user?.nucleoId
    ? Number(session?.user?.nucleoId)
    : undefined
  const idServidor = session?.user?.pessoaId
    ? Number(session?.user?.pessoaId)
    : Number(session?.user?.pessoaId)

  const Session = {
    diretoriaId,
    nucleoId,
    gerenciaId,
    idServidor,
  }

  return (
    <div className="flex flex-col gap-10 p-6">
      <TitlePage title="Inclusão de Capacitação" />
      <Form Session={Session} />
    </div>
  )
}
