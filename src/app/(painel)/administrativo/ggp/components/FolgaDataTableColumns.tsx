import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FolgaDTO } from '@/types/Folga'
import { formatDate } from '@/utils/formatDate'

export function getFolgaDataTableColumns(): ColumnDef<FolgaDTO>[] {
  return [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
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
        )
      },
      invertSorting: true,
    },
    {
      header: 'Servidor',
      accessorFn: (row) => row.nomeServidor,
    },
    {
      header: 'Lotação',
      accessorFn: (row) => row.nomeServidor,
    },
    {
      header: 'Portaria',
      accessorFn: (row) => row.nomeServidor,
    },
    {
      header: 'Data da folga',
      accessorFn: (row) => formatDate(row.dataFolga),
    },
    {
      header: 'Observação',
      accessorFn: (row) => row.observacao,
    },
  ]
}
