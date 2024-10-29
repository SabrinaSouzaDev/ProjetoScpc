import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { nuplanFormSchema } from './NuplanFormSchema'
import { NuplanChildrensData } from '@/types/Nuplan'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

type ConfirmFormFields = {
  form: UseFormReturn<z.infer<typeof nuplanFormSchema>>
  handleSubmit: (data: z.infer<typeof nuplanFormSchema>) => void
  detalhamentoFonte: NuplanChildrensData[] | undefined
  convenio: NuplanChildrensData[] | undefined
  funcaoProgramatica: NuplanChildrensData[] | undefined
  gppara: NuplanChildrensData[] | undefined
  naturezaDespesa: NuplanChildrensData[] | undefined
  planoInterno: NuplanChildrensData[] | undefined
  handleReturn: () => void
}

const findFieldById = (
  list: NuplanChildrensData[] | undefined,
  id: number,
  field: 'descricao' | 'numeroPi' = 'descricao',
) => {
  const item = list?.find((item) => item.id === id)
  return item ? item[field] : 'Campo não encontrado'
}

export default function ConfirmFormFields({
  convenio,
  detalhamentoFonte,
  funcaoProgramatica,
  gppara,
  naturezaDespesa,
  planoInterno,
  form,
  handleSubmit,
  handleReturn,
}: ConfirmFormFields) {
  const { getValues } = form
  const filteredFields = {
    convenio: findFieldById(convenio, getValues('convenioId'), 'descricao'),
    detalhamentoFonte: findFieldById(
      detalhamentoFonte,
      getValues('detalhamentoFonteId'),
      'descricao',
    ),
    funcaoProgramatica: findFieldById(
      funcaoProgramatica,
      getValues('funcaoProgramaticaId'),
      'descricao',
    ),
    gppara: findFieldById(gppara, getValues('gpparaId'), 'descricao'),
    naturezaDespesa: findFieldById(
      naturezaDespesa,
      getValues('naturezaDespesaId'),
      'descricao',
    ),
    planoInterno: findFieldById(
      planoInterno,
      getValues('planoInternoId'),
      'numeroPi',
    ),
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col space-y-8"
    >
      <div className="overflow-scroll">
        <div className="max-w-40">
          <table className="max-w-10 border border-gray-200 bg-white dark:border-gray-900 dark:bg-gray-800">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-100">
                  Função Programática
                </th>
                <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-100">
                  GP Pará
                </th>
                <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-100">
                  Convênio
                </th>
                <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-100">
                  Detalhamento da Fonte
                </th>
                <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-100">
                  Natureza da Despesa
                </th>
                <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-100">
                  Plano Interno
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:bg-neutral-900 dark:text-white">
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {filteredFields?.funcaoProgramatica}
                  </div>
                </td>
                <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {filteredFields?.gppara}
                  </div>
                </td>
                <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {filteredFields?.convenio}
                  </div>
                </td>
                <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {filteredFields?.detalhamentoFonte}
                  </div>
                </td>
                <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {filteredFields?.naturezaDespesa}
                  </div>
                </td>
                <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {filteredFields?.planoInterno}
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={3}
                  className="py-2 text-center text-gray-600 dark:text-gray-400"
                ></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={handleReturn}
        >
          Corrigir campos
        </Button>

        <DialogClose asChild>
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            type="submit"
          >
            Confirmar Envio das informações
          </Button>
        </DialogClose>
      </div>
    </form>
  )
}
