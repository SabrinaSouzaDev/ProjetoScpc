import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface MultiPickCalendar {
  selectedDates: Date[]
  setSelectedDates: (dates: Date[] | undefined) => void
}

const MultiPickCalendar = ({
  selectedDates,
  setSelectedDates,
}: MultiPickCalendar) => {
  return (
    <div className="flex flex-col gap-6 rounded-lg bg-gray-50 p-4 shadow-lg dark:bg-gray-900 md:flex-row md:gap-10">
      <DayPicker
        mode="multiple"
        selected={selectedDates}
        onSelect={(e) => setSelectedDates(e)}
        locale={ptBR}
        className="w-full rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 md:max-w-md"
        modifiersStyles={{
          selected: {
            backgroundColor: '#3b82f6',
            color: 'white',
          },
        }}
      />

      <div className="w-full rounded-lg bg-white shadow-lg dark:bg-gray-800">
        <div className="max-h-42 p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Datas selecionadas
          </h2>
          <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
            <ScrollArea className="max-h-72 overflow-y-auto">
              {selectedDates.length > 0 ? (
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-100">
                        Data
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-100">
                        Mês
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-100">
                        Ano
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {selectedDates.map((date, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="px-4 py-2 text-gray-900 dark:text-gray-300">
                          {format(date, 'dd')}
                        </td>
                        <td className="px-4 py-2 text-gray-900 dark:text-gray-300">
                          {format(date, 'MM')}
                        </td>
                        <td className="px-4 py-2 text-gray-900 dark:text-gray-300">
                          {format(date, 'yyyy')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Nenhuma data selecionada.
                </p>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiPickCalendar
