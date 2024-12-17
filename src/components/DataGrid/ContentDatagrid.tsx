/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ToastAction } from '@/components/ui/toast'
import { IndeterminateCheckbox } from './components/InderteminateCheckbox'
import { DataTable } from './components/DataTable'
import { MOCK_DATA } from './mock/mockTable'

export type Solicitacao = {
  id: number
  selecionar?: boolean
  nome: string
  qtdCredito: string
  observacao: 'Certificado' | 'Plantao'
}

export function ContentDataGrid() {
  const { toast } = useToast()
  const router = useRouter()
  const [selectedRows, setSelectedRows] = useState<Solicitacao[]>([])
  const columns = React.useMemo<ColumnDef<Solicitacao>[]>(
    () => [
      {
        accessorKey: 'id',
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
        accessorKey: 'qtdCredito',
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
        accessorKey: 'observacao',
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
      console.log(selectedRows)
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
    <DataTable
      columns={columns}
      data={MOCK_DATA}
      onSolicitarPecunha={handleSolicitarPecunha}
      selectedRowsmodel={selectedRows}
    />
  )
}
