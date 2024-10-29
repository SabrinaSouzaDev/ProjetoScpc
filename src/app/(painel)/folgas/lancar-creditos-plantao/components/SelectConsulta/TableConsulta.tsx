import { CreditoPlantaoDTO } from '@/types/Credito'
import { ListaConsultaCreditoUser } from './ListaConcultaCreditoUser'

interface TableConsultaProps {
  creditos: CreditoPlantaoDTO[]
  loading: boolean
}

export function TableConsulta({ creditos, loading }: TableConsultaProps) {
  if (!creditos.length) {
    return null
  }

  return (
    <div className="py-5">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="loader mb-4 size-12 rounded-full border-4 border-gray-200 ease-linear"></div>
          <p>Carregando créditos...</p>
        </div>
      ) : creditos.length > 0 ? (
        <div className="size-full p-0">
          <div className="flex-col rounded-lg border border-gray-200 shadow dark:border-gray-700">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="overflow-x-auto-color inline-block w-full align-middle sm:px-6 lg:px-8">
                <div className="rounded-lg border-b border-gray-200 shadow dark:border-gray-700">
                  <table className="min-w-full">
                    <caption className="my-4">
                      Informações de Crédito por Plantão
                    </caption>
                    <div>
                      <ListaConsultaCreditoUser selectedRows={creditos} />
                    </div>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Nenhum crédito disponível.</p>
      )}
    </div>
  )
}
