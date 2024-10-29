import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { ListaConcultaEscalaEdit } from '../ListaConcultaEscalaEdit'
import { EscalaEditFormSchema } from '../TypeEditPlantaoEdit/EscalaFormSchema'
import { EscalaPlantao } from '../TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'
// import EscalaListFunction from '../../../EscalaDePlantaoAdmin/functions/EscalaListFunction'
// import { EscalaPlantao } from '../../../EscalaDePlantaoAdmin/type/AprovarEscalaPlatao'

type ConfirmFormFields = {
  form: UseFormReturn<z.infer<typeof EscalaEditFormSchema>>
  handleSubmit: (data: z.infer<typeof EscalaEditFormSchema>) => void
  handleReturn: () => void
  // selectedRows: EditeEscalaPlantaoGetDTO[]
  // data: EditeEscalaPlantaoGetDTO[]
  // table: Table<EditeEscalaPlantaoGetDTO>
}

export default function ConfirmFormFields({
  form,
  handleSubmit,
  handleReturn,
  // data,
  // table,
}: ConfirmFormFields) {
  const { getValues } = form
  const uptabela = getValues() || {}
  const dadosDias = getValues('escalasPlantaoDias') || []
  const uptabelaMapped: EscalaPlantao[] = [
    {
      ...uptabela,
      id: uptabela.id,
      tipo: uptabela.tipo || '', // Garantir que `tipo` seja uma string
      diretoria: uptabela?.diretoria?.id
        ? { id: uptabela.diretoria.id, nome: uptabela.diretoria.nome }
        : undefined,
      escalasPlantaoDias:
        dadosDias?.map((escala) => ({
          id: escala?.id ?? 0,
          servidorId: escala?.servidorId?.id ?? undefined,
          servidorIdnome: escala?.servidorId?.nome ?? undefined,
          dia: escala?.dia ?? undefined,
        })) ?? [],
    },
  ]

  // const selectedRows = Object.keys(table.getState().rowSelection)
  //   .map((key) => data.find((row, index) => index === Number(key)))
  //   .filter((row): row is EscalaPlantao => row !== undefined)

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex min-h-full flex-col justify-between gap-5"
    >
      <div className="size-full p-0">
        <div className="flex-col rounded-lg border border-gray-200 shadow dark:border-gray-700">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block w-full overflow-x-auto align-middle sm:px-6 lg:px-8">
              <div className="rounded-lg border-b border-gray-200 shadow dark:border-gray-700">
                <table className="min-w-full">
                  <caption className="my-4">
                    Informações de Crédito por Plantão
                  </caption>
                  <div>
                    {/* Passar os selectedRows para o componente ListaConsultaCreditoUser */}
                    <ListaConcultaEscalaEdit selectedRows={uptabelaMapped} />
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

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
