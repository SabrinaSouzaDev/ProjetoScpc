import { ScrollArea } from '@/components/ui/scroll-area'
import { SolicitacaoFolgaDTO } from '@/types/Folga'
import { formatDate } from '@/utils/formatDate'

type TableBodyInfosProps = {
  selectedRows: SolicitacaoFolgaDTO[]
}

export default function TableBodyInfos({ selectedRows }: TableBodyInfosProps) {
  return (
    <div className="flex-col rounded-lg border-b dark:bg-gray-800">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8 ">
          <div className="overflow-hidden rounded-lg border-b border-gray-200 shadow dark:border-gray-700">
            <table className="min-w-full border border-gray-200 bg-white dark:border-gray-900 dark:bg-gray-800">
              <caption className="my-4 text-lg font-semibold text-gray-900 dark:text-white">
                Informações de Crédito por Plantão
              </caption>
              <div className="h-72 max-[1700px]:w-full min-[396px]:min-w-52 md:w-full">
                <ScrollArea className=" mb-auto flex h-full justify-center overflow-y-auto">
                  <thead>
                    <tr>
                      <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-100">
                        Servidor
                      </th>
                      <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-100">
                        Data do inicio do Plantão
                      </th>
                      <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-100">
                        Data do final do Plantão
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:bg-neutral-900 dark:text-white">
                    {selectedRows.map((item) => {
                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                            <div className="text-sm text-gray-500 dark:text-gray-300">
                              {item?.id}
                            </div>
                          </td>
                          <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {item?.nomeServidor}
                            </div>
                          </td>
                          <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {formatDate(item?.dataFolga)}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan={3}
                        className="py-2 text-center text-gray-600 dark:text-gray-400"
                      ></td>
                    </tr>
                  </tfoot>
                </ScrollArea>
              </div>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
