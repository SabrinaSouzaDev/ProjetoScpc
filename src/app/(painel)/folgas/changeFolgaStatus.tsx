'use client'
import { Dialog } from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Table } from '@tanstack/react-table'
import TableBodyInfos from './tableBodyInfos'
import { SolicitacaoFolgaDTO } from '@/types/Folga'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import defaultReloadPage from '@/utils/reload'
import FolgaFunctions from './functions/FolgaFunctions'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
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
type SolicitarFolgaProps = {
  data: SolicitacaoFolgaDTO[]
  table: Table<SolicitacaoFolgaDTO>
  action: ActionType
}
export function ChangeFolgaStatus({
  data,
  table,
  action,
}: Readonly<SolicitarFolgaProps>) {
  const [observation, setObservation] = useState('')
  const { handleUpdateFolgaStatus } = FolgaFunctions()
  const dialogProps = getDialogProps(action)
  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is SolicitacaoFolgaDTO => row !== undefined)

  async function handleConfirmRequest() {
    if (!selectedRows || selectedRows.length === 0) {
      return
    }
    const selectedRow = selectedRows[0]

    try {
      const response = await handleUpdateFolgaStatus(
        selectedRow.id,
        'TRAMITANDO',
      )
      if (response) {
        defaultReloadPage()
      }
    } catch (error) {
      return (
        <ErrorMessage
          title="Falha na requisição"
          message="Não foi possível conectar ao servidor."
        />
      )
    }
  }

  async function handleRefuseRequest() {
    if (!selectedRows || selectedRows.length === 0) {
      return
    }
    const selectedRow = selectedRows[0]
    try {
      const response = await handleUpdateFolgaStatus(
        selectedRow.id,
        'INDEFERIDO',
        observation,
      )
      if (response) {
        defaultReloadPage()
      }
    } catch (error) {
      return (
        <ErrorMessage
          title="Falha na requisição"
          message="Não foi possível conectar ao servidor."
        />
      )
    }
  }

  async function handleReturnRequest() {
    if (!selectedRows || selectedRows.length === 0) {
      return
    }
    const selectedRow = selectedRows[0]
    try {
      const response = await handleUpdateFolgaStatus(
        selectedRow.id,
        'DEVOLVIDO',
        observation,
      )
      if (response) {
        defaultReloadPage()
      }
    } catch (error) {
      return (
        <ErrorMessage
          title="Falha na requisição"
          message="Não foi possível conectar ao servidor."
        />
      )
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
          className="bg-green-700 text-white hover:bg-green-800"
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
