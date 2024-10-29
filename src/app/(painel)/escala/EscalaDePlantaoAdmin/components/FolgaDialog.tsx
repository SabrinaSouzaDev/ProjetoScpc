'use client'
import { Dialog } from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Table } from '@tanstack/react-table'
import { ListaConsultaCreditoUser } from './ListaConcultaCreditoUser'
import { EscalaPlantao } from '../type/AprovarEscalaPlatao'
type ActionType = 'DEFERIR' | 'INDEFERIR' | 'DEVOLVER'
export function getDialogProps(action: ActionType) {
  switch (action) {
    case 'DEFERIR':
      return {
        title: 'Aprovar Solicitação',
        description: 'Clique em confirmar para aprovar a Solicitação',
        buttonActionTitle: 'Aprovar Solicitação',
        className:
          'bg-green-500 text-white hover:bg-green-500/75 md:max-w-60 w-full',
      }
    case 'INDEFERIR':
      return {
        title: 'Reprovar Solicitação',
        description: 'Clique em confirmar para reprovar a Solicitação',
        buttonActionTitle: 'Reprovar Solicitação',
        className:
          'bg-red-500 text-white hover:bg-red-500/75 md:max-w-60 w-full',
      }
    case 'DEVOLVER':
      return {
        title: 'Devolver Solicitação',
        description: 'Clique em confirmar para devolver a Solicitação',
        buttonActionTitle: 'Devolver Solicitação',
        className:
          'bg-yellow-500 text-white hover:bg-yellow-500/75 md:max-w-60 w-full',
      }
    default:
      return {
        title: '',
        description: '',
        buttonActionTitle: '',
      }
  }
}
type SolicitarEscalaProps = {
  data: EscalaPlantao[]
  confirmRequest: (data: EscalaPlantao[]) => void
  table: Table<EscalaPlantao>
  isAprove?: boolean
  action: ActionType
}
export function SolicitacaoFolgaDialog({
  data,
  table,
  confirmRequest,
  action,
}: Readonly<SolicitarEscalaProps>) {
  const dialogProps = getDialogProps(action)
  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is EscalaPlantao => row !== undefined)
  return (
    <Dialog
      title={dialogProps.title}
      description={dialogProps.description}
      buttonTitle={dialogProps.buttonActionTitle}
      disabled={!selectedRows.length}
      className={dialogProps.className}
    >
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
                    <ListaConsultaCreditoUser selectedRows={selectedRows} />
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogClose asChild>
        <Button
          className="bg-slate-800 text-white hover:bg-slate-900"
          onClick={() => confirmRequest(selectedRows)}
        >
          Confirmar solicitação
        </Button>
      </DialogClose>
    </Dialog>
  )
}
