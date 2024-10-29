'use client'
import { Dialog } from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { PecuniaDTO } from '@/types/Pecunia'
import { Table } from '@tanstack/react-table'
import TableBodyInfos from '../../TableBodyInfos'
import defaultReloadPage from '@/utils/reload'
import { Input } from '@/components/ui/input'

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
export type pecuniaDialogProps = {
  data: PecuniaDTO[]
  table: Table<PecuniaDTO>
  isAprove?: boolean
  confirmRequest: (selectedRows: PecuniaDTO[]) => Promise<void>
  action: ActionType
  isDisabled?: boolean
  isSubmitting?: boolean
  className?: string
  observation?: string
  setObservation?: (value: string) => void
}

export default function PecuniaDialog({
  data,
  table,
  confirmRequest,
  action,
  isDisabled,
  isSubmitting,
  className,
  observation,
  setObservation,
}: pecuniaDialogProps) {
  const dialogProps = getDialogProps(action)
  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is PecuniaDTO => row !== undefined)

  const isButtonDisabled =
    isDisabled || // Desabilitar se `isDisabled` for true
    isSubmitting || // Desabilitar se estiver submetendo
    selectedRows.length === 0 || // Desabilitar se nenhuma linha estiver selecionada
    selectedRows.some(
      (row) =>
        !row.detalhamentoFonteId ||
        !row.funcaoProgramaticaId ||
        !row.gpparaId ||
        !row.naturezaDespesaId ||
        !row.planoInternoId,
    )

  const handleConfirm = async () => {
    await confirmRequest(selectedRows)
    defaultReloadPage()
  }

  const handleChangeValue = (value: string) => {
    if (!setObservation) {
      return
    }

    setObservation(value)
  }

  return (
    <Dialog
      title={dialogProps.title}
      description={dialogProps.description}
      buttonTitle={dialogProps.buttonActionTitle}
      disabled={isDisabled || isSubmitting}
      className={className}
    >
      <TableBodyInfos selectedRows={selectedRows} />

      {action === 'INDEFERIR' ? (
        <div className="flex flex-col gap-4">
          <label>Observação</label>
          <Input
            placeholder="Insinar o motivo abaixo"
            value={observation}
            onChange={(e) => handleChangeValue(e.target.value)}
          />
        </div>
      ) : null}

      <DialogClose asChild>
        <Button
          className="bg-green-500 text-white hover:bg-green-600"
          onClick={handleConfirm}
          disabled={
            isButtonDisabled || (action === 'INDEFERIR' && !observation)
          }
        >
          {isSubmitting ? 'Processando...' : action}
        </Button>
      </DialogClose>
    </Dialog>
  )
}
