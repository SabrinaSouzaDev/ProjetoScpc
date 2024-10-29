'use server'
import { Diretoria } from '@/types/UnidadesAdministrativas'
import { FolgasFormEscolaSuperior } from './components/LancarFolgaFormEscolaSuperior'
import { TitlePage } from '@/components/TitlePage'
import permissionsMapping, {
  WarningMessageId,
} from '@/utils/permissionsMapping'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { consultaDiretorias } from '@/app/services/server/ScpcServiceServer'

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
  }

  return (
    <div className="flex flex-col gap-7 p-6">
      {permissionsMapping(
        session?.user?.resourceAccess?.scpc.roles || undefined,
      ) || (
        <>
          <TitlePage title="Lançamento de Crédito - Escola" />
          <FolgasFormEscolaSuperior listaDiretorias={diretorias} />
        </>
      )}
    </div>
  )
}
