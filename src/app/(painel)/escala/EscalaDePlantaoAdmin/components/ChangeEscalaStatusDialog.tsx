'use client'

import { Dialog } from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import defaultReloadPage from '@/utils/reload'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'
import EscalaListFunction from '../functions/EscalaListFunction'
import { EscalaPlantao } from '../type/AprovarEscalaPlatao'
import { ListaConsultaCreditoUser } from './ListaConcultaCreditoUser'
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
export type escalaDialogProps = {
  data: EscalaPlantao[]
  table: Table<EscalaPlantao>
  isAprove?: boolean
  action: ActionType
}

export default function PecuniaDialog({
  data,
  table,
  action,
}: escalaDialogProps) {
  const [observation, setObservation] = useState('')
  const dialogProps = getDialogProps(action)
  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is EscalaPlantao => row !== undefined)
  const { handleUpdateEscalaStatus } = EscalaListFunction()

  async function handleConfirmRequest() {
    if (!selectedRows || selectedRows.length === 0) {
      return
    }
    const selectedRow = selectedRows[0]
    try {
      const response = await handleUpdateEscalaStatus(
        selectedRow.id,
        'DEFERIDO',
      )
      if (response) {
        defaultReloadPage()
      }
    } catch (error) {
      console.error('Erro ao confirmar solicitação:', error)
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
      console.error('Nenhuma linha selecionada.')
      return
    }
    const selectedRow = selectedRows[0]
    console.log('aqui esta o id', selectedRow.id)
    try {
      const response = await handleUpdateEscalaStatus(
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
      console.error('Nenhuma linha selecionada.')
      return
    }
    const selectedRow = selectedRows[0]
    console.log('aqui esta o id', selectedRow.id)
    try {
      const response = await handleUpdateEscalaStatus(
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

      {action === 'INDEFERIR' ? (
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
          disabled={action === 'INDEFERIR' && !observation}
        >
          Confirmar solicitação
        </Button>
      </DialogClose>
    </Dialog>
  )
}
