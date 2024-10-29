'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { consultaDiretorias } from '@/app/services/server/ScpcServiceServer'
import { TitlePage } from '@/components/TitlePage'
import { Diretoria } from '@/types/UnidadesAdministrativas'
import permissionsMapping, {
  WarningMessageId,
} from '@/utils/permissionsMapping'
import { getServerSession } from 'next-auth'
import { FolgasFormDiretorias } from './components/ FolgasForm/LancarFolgaFormDiretorias'
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
    <div className="flex flex-col gap-7 p-6">
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <>
          <TitlePage title="Lançamento de Plantão" />
          <FolgasFormDiretorias listaDiretorias={diretorias} />
        </>
      )}
    </div>
  )
}
