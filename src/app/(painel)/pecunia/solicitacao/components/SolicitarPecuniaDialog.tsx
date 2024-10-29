'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
// import { ScrollArea } from '@/components/ui/scroll-area'
import { CreditoDTO } from '@/types/Credito'
// import { calcularValorPeso } from '@/utils/CalcularValorPeso'
// import { formatDate } from '@/utils/formatDate'
import { Table } from '@tanstack/react-table'
import { Check } from 'lucide-react'
import { DemostrativoDeDados } from './DemostrativoDadosUser'
import React from 'react'
import { UserConta } from '@/app/services/server/ServidorConta'
import { useToast } from '@/components/ui/use-toast'
import { ContasUsuarioTable } from './ContasUsuarioTable'

type SolicitarPecuniaProps = {
  data: CreditoDTO[]
  table: Table<CreditoDTO>
  confirmRequest: (data: CreditoDTO[], selectedConta: UserConta[]) => void
  contaId?: string
  agenciaId?: string
  bancoId?: number
  ServidorId: number
  // onSelectConta: (conta: UserConta | undefined) => void
}

export default function SolicitarPecuniaDialog({
  data,
  table,
  ServidorId,
  confirmRequest,
}: SolicitarPecuniaProps) {
  const { toast } = useToast()
  const [selectedConta, setSelectedConta] = React.useState<
    UserConta | undefined
  >(undefined)
  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is CreditoDTO => row !== undefined)

  const handleRowSelectConta = (conta: UserConta | undefined) => {
    setSelectedConta(conta)
  }

  const handleConfirm = () => {
    if (selectedConta) {
      confirmRequest(selectedRows, [selectedConta])
    } else {
      toast({ title: 'Erro', description: 'Nenhuma conta selecionada.' })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="dark: mb-4 w-full bg-green-500 text-white hover:bg-green-500/75 md:max-w-60"
          size="sm"
          variant="default"
          disabled={!selectedRows.length}
        >
          <Check className="mr-1" size={20} color="#ffffff" />
          Solicitar Pecúnia
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-y-auto-color flex max-h-[92vh] min-w-[300px] max-w-[50rem] flex-col justify-between gap-8 sm:w-5/6 md:w-full">
        <DialogHeader>
          <DialogTitle>Confirmar solicitação</DialogTitle>
          <DialogDescription>
            Caso os dados informados estejam corretos, clique no botão abaixo
            para confirmar
          </DialogDescription>
        </DialogHeader>
        <div className="flex-col rounded-lg border border-gray-200 shadow dark:border-gray-700">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="overflow-x-auto-color inline-block w-full align-middle sm:px-6 lg:px-8">
              <div className="rounded-lg border-b border-gray-200 shadow dark:border-gray-700">
                <table className="w-full">
                  <caption className="my-4">
                    Selecione a conta que deseja receber a pecúnia
                  </caption>
                  <div>
                    <ContasUsuarioTable
                      id={ServidorId}
                      onSelectConta={handleRowSelectConta}
                    />
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <DataList table={table} filterFields={filterFields || ''} /> */}
        <div className="flex-col rounded-lg border border-gray-200 shadow dark:border-gray-700">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="overflow-x-auto-color inline-block w-full align-middle sm:px-6 lg:px-8">
              <div className="rounded-lg border-b border-gray-200 shadow dark:border-gray-700">
                <table className="w-full">
                  <caption className="my-4">
                    Informações de Crédito por Plantão
                  </caption>
                  <div>
                    <DemostrativoDeDados selectedRows={selectedRows} />
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>

        <DialogClose asChild>
          <Button onClick={handleConfirm} disabled={!selectedConta}>
            Confirmar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
