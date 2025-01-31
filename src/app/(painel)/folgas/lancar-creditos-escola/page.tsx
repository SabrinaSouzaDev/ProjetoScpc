'use server'
import { consultaDiretorias } from '@/app/services/server/ScpcServiceServer'
import { Diretoria } from '@/types/UnidadesAdministrativas'
import { FolgasFormEscolaSuperior } from './components/LancarFolgaFormEscolaSuperior'
export default async function Page() {
  let diretorias: Diretoria[] = []
  try {
    diretorias = await consultaDiretorias()
  } catch (error) {
    console.error('Erro ao buscar diretorias:', error)
  }

  return (
    <div className="p-10">
      <FolgasFormEscolaSuperior listaDiretorias={diretorias} />
    </div>
  )
}
