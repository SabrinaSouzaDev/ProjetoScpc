/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { DataTable } from './solicitacao/components/DataTable'
import { IndeterminateCheckbox } from './solicitacao/components/InderteminateCheckbox'
import { MOCK_DATA } from './solicitacao/mock/mockTable'

export type Solicitacao = {
  idPlantao: number
  selecionar?: boolean
  nome: string
  inicioPlantao: string
  fimPlantao: string
}

export default function Page() {
  const { toast } = useToast()
  const router = useRouter()
  const [selectedRows, setSelectedRows] = useState<Solicitacao[]>([])
  const columns = React.useMemo<ColumnDef<Solicitacao>[]>(
    () => [
      {
        accessorKey: 'idPlantao',
        header: ({ column }) => {
          return (
            <>
              <Button
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
                variant="ghost"
                onClick={() => {
                  column.toggleSorting(column.getIsSorted() === 'asc')
                }}
              >
                ID
                <ArrowUpDown className="ml-2 size-4" />
              </Button>
            </>
          )
        },
        footer: (props) => props.column.id,
        invertSorting: true,
      },
      {
        id: 'selecionar',
        header: ({ table }) => (
          <div className="flex gap-3 px-1">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Selecionar
            </label>
          </div>
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'nome',
        header: ({ column }) => {
          return (
            <Button
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === 'asc')
              }}
            >
              Nome
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          )
        },
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'inicioPlantao',
        header: ({ column }) => {
          return (
            <Button
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === 'asc')
              }}
            >
              Qtd.Credito
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          )
        },
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'fimPlantao',
        header: ({ column }) => {
          return (
            <Button
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === 'asc')
              }}
            >
              Observação
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          )
        },
        footer: (props) => props.column.id,
      },
    ],
    [],
  )

  const handleSolicitarPecunha = async (selectedRows: {
    rows: Array<Solicitacao>
  }) => {
    // Verifique se pelo menos uma linha foi selecionada
    if (selectedRows.rows.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Para realizar a solicitação de pecunha',
        description: 'Por favor, selecione pelomenos um',
        action: (
          <ToastAction altText="Goto schedule to undo">fechar</ToastAction>
        ),
        duration: 5000,
      })
      return
    }
    try {
      setSelectedRows(selectedRows.rows)
      toast({
        title: 'Solicitado com sucesso',
        action: (
          <ToastAction altText="Goto schedule to undo">fechar</ToastAction>
        ),
        duration: 3000,
      })
      router.back()
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Ocorreu um erro na solicitação',
        action: (
          <ToastAction altText="Goto schedule to undo">fechar</ToastAction>
        ),
        duration: 5000,
      })
    }
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={MOCK_DATA}
        onSolicitarPecunha={handleSolicitarPecunha}
        selectedRowsmodel={selectedRows}
      />
    </>
  )
}
