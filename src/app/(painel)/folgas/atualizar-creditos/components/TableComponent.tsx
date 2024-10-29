'use client'

import { ColumnDef } from '@tanstack/react-table'
import { data } from '../mock/mockTable'
import { DataTable } from './DataTable'

export type Payment = {
  id: number
  button?: JSX.Element
  datai: string
  dataf: string
  quantcred: string
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'datai',
    header: 'Data Inicial',
  },

  {
    accessorKey: 'dataf',
    header: 'Data Final',
  },
  {
    accessorKey: 'quantcred',
    header: 'Quantidade de Crédito',
  },

  {
    accessorKey: 'button',
    header: 'Opções',
    cell: ({ row }) => row.original.button,
  },
]

export default function TableComponent() {
  return (
    <div className="p-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
