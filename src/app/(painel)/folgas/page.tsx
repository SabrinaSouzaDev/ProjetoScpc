'use client'

import { DataTable } from '@/components/Shared/DataTable'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'

import { ArrowUpDown } from 'lucide-react'
import { mockStatus } from './mockStatus'
import { data } from './mock/mockTable'
import { CardButton } from '@/components/Shared/CardButton'

export type Payment = {
  id: number
  name: string
  email: string
  sector: string
  button?: JSX.Element
  state?: JSX.Element
  datasit: string
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Solicitante
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'sector',
    header: 'Setor',
  },
  {
    accessorKey: '',
    header: 'Meio de Transporte',
  },
  {
    accessorKey: '',
    header: 'Tipo Diária',
  },
  {
    accessorKey: '',
    header: 'Ação',
  },
  {
    accessorKey: '',
    header: 'Processo',
  },
  {
    accessorKey: 'datasit',
    header: 'Data Solicitação',
    filterFn: 'includesString',
  },
  {
    accessorKey: '',
    header: 'Situação',
  },
  {
    accessorKey: '',
    header: 'Estado',
    cell: ({ row }) => row.original.state,
  },
  {
    accessorKey: '',
    header: 'Portaria',
  },
  {
    accessorKey: 'button',
    header: 'Opções',
    cell: ({ row }) => row.original.button,
  },
]

export default function Page() {
  return (
    <>
      <CardButton dados={mockStatus} />
      <DataTable columns={columns} data={data} />
    </>
  )
}
