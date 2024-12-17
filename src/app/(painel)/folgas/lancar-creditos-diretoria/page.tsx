import { Diretoria } from '@/types/UnidadesAdministrativas'
import { FolgasFormDiretorias } from './components/LancarFolgaFormDiretorias'
import { consultaDiretorias } from '@/app/services/server/ScpcServiceServer'

// ANCHOR chamado dos dados mockeds
// import { mocDirectorias } from './data/mockedData'
export default async function Page() {
  let diretorias: Diretoria[] = []
  try {
    diretorias = await consultaDiretorias()
  } catch (error) {
    console.error('Erro ao buscar diretorias:', error)
  }

  return (
    <div className="p-10">
      <FolgasFormDiretorias listaDiretorias={diretorias} />
    </div>
  )
}
