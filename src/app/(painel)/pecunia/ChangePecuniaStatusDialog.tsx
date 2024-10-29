'use client'

import { Dialog } from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { PecuniaDTO } from '@/types/Pecunia'
import { Table } from '@tanstack/react-table'
import TableBodyInfos from './TableBodyInfos'
import PecuniaFunctions from './functions/PecuniaFunctions'
import defaultReloadPage from '@/utils/reload'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

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
  action: ActionType
}

export default function PecuniaDialog({
  data,
  table,
  action,
}: pecuniaDialogProps) {
  const [observation, setObservation] = useState('')
  const dialogProps = getDialogProps(action)
  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is PecuniaDTO => row !== undefined)
  const { handleUpdatePecuniaStatus } = PecuniaFunctions()

  async function handleConfirmRequest() {
    const isMultipleRows: boolean = selectedRows?.length > 1
    const selectedRow = selectedRows[0]

    if (isMultipleRows) {
      let mapResponse
      const mappedIds: number[] = []
      selectedRows.map((item) => mappedIds.push(item.id))

      for (const row of mappedIds) {
        mapResponse = await handleUpdatePecuniaStatus(row, 'TRAMITANDO')
      }
      return mapResponse ? defaultReloadPage() : null
    }

    const response = await handleUpdatePecuniaStatus(
      selectedRow.id,
      'TRAMITANDO',
    )
    if (response) {
      defaultReloadPage()
    }
  }

  async function handleRefuseRequest() {
    const isMultipleRows: boolean = selectedRows?.length > 1
    const selectedRow = selectedRows[0]

    if (isMultipleRows) {
      let mapResponse
      const mappedIds: number[] = []
      selectedRows.map((item) => mappedIds.push(item.id))

      for (const row of mappedIds) {
        mapResponse = await handleUpdatePecuniaStatus(
          row,
          'INDEFERIDO',
          observation,
        )
      }
      return mapResponse ? defaultReloadPage() : null
    }

    const response = await handleUpdatePecuniaStatus(
      selectedRow.id,
      'INDEFERIDO',
      observation,
    )
    if (response) {
      defaultReloadPage()
    }
  }

  async function handleReturnRequest() {
    const isMultipleRows: boolean = selectedRows?.length > 1
    const selectedRow = selectedRows[0]

    if (isMultipleRows) {
      let mapResponse
      const mappedIds: number[] = []
      selectedRows.map((item) => mappedIds.push(item.id))

      for (const row of mappedIds) {
        mapResponse = await handleUpdatePecuniaStatus(row, 'DEVOLVIDO')
      }
      return mapResponse ? defaultReloadPage() : null
    }

    const response = await handleUpdatePecuniaStatus(
      selectedRow.id,
      'DEVOLVIDO',
    )
    if (response) {
      defaultReloadPage()
    }
  }

  const handleUpdateStatus = async () => {
    switch (action) {
      case 'DEFERIR':
        await handleConfirmRequest()
        setObservation('')
        break
      case 'INDEFERIR':
        await handleRefuseRequest()
        setObservation('')
        break
      case 'DEVOLVER':
        await handleReturnRequest()
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
      disabled={!selectedRows.length}
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
            (action === 'INDEFERIR' && !observation) ||
            (action === 'DEVOLVER' && !observation)
          }
        >
          Confirmar solicitação
        </Button>
      </DialogClose>
    </Dialog>
  )
}
