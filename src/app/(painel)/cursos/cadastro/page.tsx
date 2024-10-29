import { TitlePage } from '@/components/TitlePage'
import Form from './components/Form'
import { Diretoria } from '@/types/UnidadesAdministrativas'
import { consultaDiretorias } from '@/app/services/server/ScpcServiceServer'
import { WarningMessageId } from '@/utils/permissionsMapping'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.pessoaId) {
    return <WarningMessageId />
  }

  let diretorias: Diretoria[] = []
  try {
    diretorias = await consultaDiretorias()
  } catch (error) {
    console.error('Erro ao buscar diretorias:', error)
    return (
      <ErrorMessage
        title="Falha na requisição"
        message="Não foi possível conectar ao servidor."
      />
    )
  }
  return (
    <div className="flex flex-col gap-10 p-6">
      <TitlePage title="Cadastrar curso" />
      <Form listaDiretorias={diretorias} />
    </div>
  )
}
