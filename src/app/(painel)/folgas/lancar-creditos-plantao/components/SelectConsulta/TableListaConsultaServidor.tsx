import { ScrollArea } from '@/components/ui/scroll-area'
import { CreditoPlantaoDTO } from '@/types/Credito'
import { formatDate } from '@/utils/formatDate'

type ConsultaCredito = {
  creditos?: CreditoPlantaoDTO[]
}
export function TableListaConsultaServidor({ creditos }: ConsultaCredito) {
  return (
    <div className="flex-col rounded-lg border-b dark:bg-gray-800">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block w-full align-middle sm:px-6 lg:px-8">
          <div className="overflow-auto rounded-lg border-b border-gray-200 shadow dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <caption className="my-4 text-lg font-semibold text-gray-900 dark:text-white">
                Informações de Crédito por Plantão
              </caption>
              <ScrollArea className="h-72 whitespace-nowrap rounded-md border">
                <tbody className="divide-y divide-gray-400 bg-slate-50 dark:bg-neutral-900 dark:text-white">
                  {creditos?.map((credito) => (
                    <tr key={credito.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          ID: {credito.id}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          ID Plantão: {credito.idPlantao}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          Data do plantão:{' '}
                          {formatDate(credito.dataCredito?.toString())}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          Peso do Plantão: {credito.numeroPesos}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ScrollArea>
              <tfoot>
                <tr>
                  <td
                    colSpan={4}
                    className="py-2 text-center text-gray-600 dark:text-gray-400"
                  ></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
