'use client'
import { updateScaleInfos } from '@/app/services/scaleService'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { ScaleInfos } from '@/types/Scale'
import { ErrorMapping } from '@/utils/errorMapping'
import defaultReloadPage from '@/utils/reload'
import { useState } from 'react'

interface FormProps {
  item: ScaleInfos
}

export default function Form({ item }: FormProps) {
  const [relatorioDescricao, setRelatorioDescricao] = useState('')
  const { id, servidor, escalaPlantao } = item
  const { toast } = useToast()

  const handleUpdateScaleInfos = async () => {
    let errorTreatment
    try {
      const response = await updateScaleInfos(id, relatorioDescricao)

      if (response !== 'SUCCESS_UPDATE') {
        errorTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      toast({
        description: 'Atualização salva com sucesso',
        duration: 3000,
      })
      setRelatorioDescricao('')
      defaultReloadPage()
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          errorTreatment || 'Ocorreu um erro ao salvar atualização de escala!',
        duration: 3000,
      })
    }
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex-col rounded-lg border-b dark:bg-gray-800">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8 ">
            <div className="overflow-hidden rounded-lg border-b border-gray-200 shadow dark:border-gray-700">
              <table className="min-w-full border border-gray-200 bg-white dark:border-gray-900 dark:bg-gray-800">
                <caption className="my-4 text-[0.6rem] font-semibold text-gray-900 dark:text-white md:text-[0.8rem]">
                  Informações de Escala
                </caption>
                <div className="h-72 max-[1700px]:w-full min-[396px]:min-w-52 md:w-full">
                  <ScrollArea className=" mb-auto flex h-full justify-center overflow-y-auto">
                    <thead>
                      <tr>
                        <th className="border-b px-4 py-2 text-[0.6rem] text-gray-700 dark:text-gray-100 sm:text-[0.8rem]">
                          Servidor
                        </th>
                        <th className="border-b px-4 py-2 text-[0.6rem] text-gray-700 dark:text-gray-100 sm:text-[0.8rem]">
                          Alocação
                        </th>
                        <th className="border-b px-4 py-2 text-[0.6rem] text-gray-700 dark:text-gray-100 sm:text-[0.8rem]">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:bg-neutral-900 dark:text-white">
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                          <div className="text-center text-[0.6rem] text-gray-500 dark:text-gray-300 md:text-[0.8rem]">
                            {servidor?.nome}
                          </div>
                        </td>
                        <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                          <div className="text-center text-[0.6rem] text-gray-900 dark:text-white md:text-[0.8rem]">
                            {escalaPlantao?.diretoria.nome}
                          </div>
                        </td>
                        <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                          <div className="text-center text-[0.6rem] text-gray-900 dark:text-white md:text-[0.8rem]">
                            {escalaPlantao.status}
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
                  </ScrollArea>
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[1.1rem]">Descrição do relatório</label>
        <textarea
          onChange={(e) => setRelatorioDescricao(e.target.value)}
          placeholder="Insira a descrição da atividade realizada"
          className="
          scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 dark:scrollbar-thumb-gray-400 dark:scrollbar-track-gray-700 max-h-60 min-h-36 w-full max-w-md
          resize-none overflow-y-auto rounded-md
          border p-2
        "
          rows={4}
        />
      </div>

      <DialogClose asChild>
        <Button
          className="bg-green-700 text-white hover:bg-green-800"
          onClick={handleUpdateScaleInfos}
          disabled={!relatorioDescricao}
        >
          Confirmar Alteração
        </Button>
      </DialogClose>
    </div>
  )
}
