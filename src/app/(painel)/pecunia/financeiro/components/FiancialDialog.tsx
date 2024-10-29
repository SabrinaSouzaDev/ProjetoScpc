import { Dialog } from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PecuniaDTO } from '@/types/Pecunia'
// import defaultReloadPage from '@/utils/reload'
import { Table } from '@tanstack/react-table'
import React from 'react'
import TableBodyInfos from '../../TableBodyInfos'

export type financialDialogProps = {
  data: PecuniaDTO[]
  table: Table<PecuniaDTO>
  isDisabled?: boolean
  isSubmitting?: boolean
  confirmRequest: (selectedRows: PecuniaDTO[]) => Promise<void>
  handleFileChange: React.ChangeEventHandler<HTMLInputElement>
  annexFile: File | null
}

export default function FinancialDialog({
  data,
  table,
  confirmRequest,
  isDisabled,
  isSubmitting,
  annexFile,
  handleFileChange,
}: financialDialogProps) {
  const [lastPage, setLastPage] = React.useState<boolean>(false)

  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is PecuniaDTO => row !== undefined)

  function handleChangePage() {
    setLastPage(!lastPage)
  }

  const isButtonDisabled =
    isDisabled ||
    isSubmitting ||
    selectedRows.length === 0 ||
    selectedRows.some((row) => !row.numeroEmpenho || !row.ob || !row.liquidacao)

  const handleConfirm = async () => {
    await confirmRequest(selectedRows)
  }

  return (
    <Dialog
      title="Anexar Arquivo"
      description={
        lastPage
          ? 'Usuários abaixo terão o arquivo anexado às suas informações financeiras'
          : 'Adicione abaixo o arquivo que você deseja anexar para os usuários selecionados'
      }
      buttonTitle="Anexar Arquivo"
      disabled={isDisabled || isSubmitting}
      className="w-full bg-green-500 text-white hover:bg-green-500 md:max-w-60"
    >
      {lastPage ? (
        <div className="flex flex-col gap-8">
          <TableBodyInfos selectedRows={selectedRows} />
          <div className="flex flex-wrap justify-between gap-4 p-4 sm:gap-0">
            <Button
              className="h-12 w-full bg-red-600 text-[0.7rem] text-white hover:bg-red-700 sm:w-36 sm:text-[0.8rem]"
              onClick={handleChangePage}
            >
              Retornar Etapa
            </Button>
            <DialogClose asChild>
              <Button
                className="h-12 w-full bg-green-600 text-[0.7rem] text-white hover:bg-green-700 sm:w-40 sm:text-[0.8rem]"
                onClick={handleConfirm}
                disabled={isButtonDisabled}
              >
                Confirmar Solicitação
              </Button>
            </DialogClose>
          </div>
        </div>
      ) : (
        <div className="flex w-full max-w-sm flex-col gap-5">
          <Label htmlFor="anexoFinanceiro">Anexo Financeiro</Label>
          <Input id="anexoFinanceiro" type="file" onChange={handleFileChange} />
          <div className="mt-4 flex justify-end">
            <Button
              className="h-10 w-36 bg-green-600 text-white hover:bg-green-700"
              onClick={handleChangePage}
              disabled={!annexFile}
            >
              {isSubmitting ? 'Processando...' : 'Anexar Arquivo'}
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  )
}
