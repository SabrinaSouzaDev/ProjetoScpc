import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScaleInfos } from '@/types/Scale'
import { StatusChip } from '@/components/StatusChip'
import { formatDate } from '@/utils/formatDate'
import { Checkbox } from '@/components/ui/checkbox'

export function getColumns(): ColumnDef<ScaleInfos>[] {
  return [
    {
      id: 'selecionar',
      header: ({ table }) => (
        <div className="flex gap-3 px-1">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        </div>
      ),
      footer: (props) => props.column.id,
    },
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center">
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
          </div>
        )
      },
      cell: (item) => (
        <div className="flex items-center justify-center">
          {item.row.original?.id}
        </div>
      ),
      invertSorting: true,
    },
    {
      accessorKey: 'servidor',
      header: () => (
        <div className="flex items-center justify-center">Servidor</div>
      ),
      cell: (item) => (
        <div className="flex items-center justify-center">
          {item.row.original?.servidor.nome}
        </div>
      ),
    },
    {
      accessorKey: 'alocacao',
      header: () => (
        <div className="flex items-center justify-center">Alocação</div>
      ),
      cell: (item) => (
        <div className="flex items-center justify-center">
          {item.row.original?.escalaPlantao.diretoria.nome}
        </div>
      ),
    },
    {
      accessorKey: 'Descrição',
      header: () => (
        <div className="flex items-center justify-center">Descrição</div>
      ),
      cell: (item) => (
        <div className="flex items-center justify-center">
          {item.row.original?.relatorioDescricao}
        </div>
      ),
    },
    {
      accessorKey: 'emissao',
      header: () => (
        <div className="flex items-center justify-center">Emissão</div>
      ),
      cell: (item) => (
        <div className="flex items-center justify-center">
          {formatDate(item.row.original?.relatorioDiaEmitido)}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: () => (
        <div className="flex items-center justify-center">Status</div>
      ),
      cell: (item) => (
        <div className="flex items-center justify-center">
          <StatusChip status={item.row.original?.status} />
        </div>
      ),
    },
  ]
}
