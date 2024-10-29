'use client'

import { Dialog } from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Table } from '@tanstack/react-table'
import defaultReloadPage from '@/utils/reload'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { ScaleInfos } from '@/types/Scale'
import { updateReportStatus } from '@/app/services/scaleService'
import { ErrorMapping } from '@/utils/errorMapping'
import { useToast } from '@/components/ui/use-toast'
import { TableBodyInfos } from './TableBodyInfos'

type ActionType = 'DEFERIR' | 'INDEFERIR' | 'DEVOLVER'

export function getDialogProps(action: ActionType) {
  switch (action) {
    case 'DEFERIR':
      return {
        title: 'Aprovar Solicitação',
        description: 'Clique em confirmar para aprovar a Solicitação',
        buttonActionTitle: 'Aprovar Solicitação',
        className: 'bg-green-500 text-white hover:bg-green-500/75 md:max-w-60',
      }
    case 'INDEFERIR':
      return {
        title: 'Reprovar Solicitação',
        description: 'Clique em confirmar para reprovar a Solicitação',
        buttonActionTitle: 'Reprovar Solicitação',
        className: 'bg-red-500 text-white hover:bg-red-500/75 md:max-w-60',
      }
    case 'DEVOLVER':
      return {
        title: 'Devolver Solicitação',
        description: 'Clique em confirmar para devolver a Solicitação',
        buttonActionTitle: 'Devolver Solicitação',
        className:
          'bg-yellow-500 text-white hover:bg-yellow-500/75 md:max-w-60',
      }
    default:
      return {
        title: '',
        description: '',
        buttonActionTitle: '',
      }
  }
}
export type reportDialogProps = {
  data: ScaleInfos[]
  table: Table<ScaleInfos>
  action: ActionType
  disable?: boolean
}

export default function ReportDialog({
  data,
  table,
  action,
  disable,
}: reportDialogProps) {
  const [observation, setObservation] = useState('')
  const dialogProps = getDialogProps(action)
  const { toast } = useToast()
  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is ScaleInfos => row !== undefined)

  async function UpdateStatus(status: string) {
    let errorTreatment
    try {
      const response = await updateReportStatus(
        selectedRows[0].id,
        status,
        observation,
      )

      if (response !== 'SUCCESS_UPDATE') {
        errorTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      toast({
        title: 'Solicitação atualiza com sucesso',
        duration: 3000,
      })
      defaultReloadPage()
    } catch (err) {
      toast({
        variant: 'destructive',
        title: errorTreatment || 'Erro ao realizar solicitação',
        duration: 4000,
      })
    }
  }

  const handleUpdateStatus = async () => {
    switch (action) {
      case 'DEFERIR':
        await UpdateStatus('DEFERIDO')
        setObservation('')
        break
      case 'INDEFERIR':
        await UpdateStatus('INDEFERIDO')
        setObservation('')
        break
      case 'DEVOLVER':
        await UpdateStatus('DEVOLVIDO')
        setObservation('')
        break
      default:
        return ''
    }
  }

  return (
    <Dialog
      title={dialogProps.title}
      description={dialogProps.description}
      buttonTitle={dialogProps.buttonActionTitle}
      disabled={!selectedRows.length || disable}
      className={dialogProps.className}
    >
      <TableBodyInfos selectedRows={selectedRows} />

      {action !== 'DEFERIR' ? (
        <div className="flex flex-col gap-4">
          <label>Observação</label>
          <Input
            placeholder="Insinar o motivo abaixo"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
        </div>
      ) : null}

      <DialogClose asChild>
        <Button
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={handleUpdateStatus}
          disabled={
            !observation && (action === 'DEVOLVER' || action === 'INDEFERIR')
          }
        >
          Confirmar solicitação
        </Button>
      </DialogClose>
    </Dialog>
  )
}
