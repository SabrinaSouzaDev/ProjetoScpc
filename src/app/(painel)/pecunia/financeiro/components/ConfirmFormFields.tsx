import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { financialFormSchema } from './FinancialFormSchema'

type ConfirmFormFields = {
  form: UseFormReturn<z.infer<typeof financialFormSchema>>
  handleSubmit: (data: z.infer<typeof financialFormSchema>) => void
  handleReturn: () => void
}

export default function ConfirmFormFields({
  form,
  handleSubmit,
  handleReturn,
}: ConfirmFormFields) {
  const { getValues } = form

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex min-h-full flex-col justify-between gap-5"
    >
      <table className="border border-gray-200 bg-white dark:border-gray-900 dark:bg-gray-800">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-[0.5rem] text-gray-700 dark:text-gray-100 sm:text-[0.7rem] md:text-[1rem]">
              Número de Empenho
            </th>
            <th className="border-b px-4 py-2 text-[0.5rem] text-gray-700 dark:text-gray-100 sm:text-[0.7rem] md:text-[1rem]">
              Ordem Bancária
            </th>
            <th className="border-b px-4 py-2 text-[0.5rem] text-gray-700 dark:text-gray-100 sm:text-[0.7rem] md:text-[1rem]">
              Número de Liquidação
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white text-center dark:bg-neutral-900 dark:text-white">
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
              <div className="text-[0.7rem] text-gray-500 dark:text-gray-300">
                {getValues('numeroEmpenho')}
              </div>
            </td>
            <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
              <div className="text-[0.7rem] text-gray-900 dark:text-white">
                {getValues('ob')}
              </div>
            </td>
            <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
              <div className="text-[0.7rem] text-gray-900 dark:text-white">
                {getValues('liquidacao')}
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

      <div className="flex flex-wrap items-center justify-between gap-6">
        <Button
          className="block min-w-full max-w-[20%] bg-red-600 text-[0.7rem]  text-white hover:bg-red-700 sm:min-w-44 md:text-[0.9rem] "
          onClick={handleReturn}
        >
          Corrigir campos
        </Button>

        <DialogClose asChild>
          <Button
            className="block min-w-full bg-green-600 text-[0.5rem] text-white hover:bg-green-700 sm:min-w-12 sm:max-w-[40%] md:text-[0.6rem]"
            type="submit"
          >
            Confirmar Envio das informações
          </Button>
        </DialogClose>
      </div>
    </form>
  )
}
