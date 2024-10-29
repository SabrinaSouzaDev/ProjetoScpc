import { AlignDiv } from '@/components/AlignDiv'
import { StatusChip } from '@/components/StatusChip'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SolicitacaoDTO } from '@/types/Solicitacao'
import { formatDate } from '@/utils/formatDate'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export function getColumns(): ColumnDef<SolicitacaoDTO>[] {
  const notFoundField = 'Campo não informado'
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
            disabled
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
    },
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <AlignDiv>
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
        </AlignDiv>
      ),
      invertSorting: true,
    },
    {
      accessorKey: 'nomeServidor',
      header: 'Servidor',
    },
    {
      header: 'Status',
      cell: (item) => <StatusChip status={item.row.original?.status} />,
    },
    { accessorKey: 'situacao', header: 'Situação' },
    {
      accessorKey: 'dataSolicitacao',
      header: () => <AlignDiv>Data de Solicitação</AlignDiv>,
      accessorFn: (row) => formatDate(row.dataSolicitacao),
    },
    {
      accessorKey: 'credito.0.plantao.inicioPlantao', // Chave base para o array
      header: 'Início do plantão',
      accessorFn: (row) =>
        formatDate(row.creditos[0]?.plantao.inicioPlantao) || notFoundField,
    },
    {
      accessorKey: 'credito.0.plantao.fimPlantao', // Chave base para o array
      header: 'Final do Plantão',
      accessorFn: (row) =>
        formatDate(row.creditos[0]?.plantao.fimPlantao) || notFoundField,
    },
  ]
}
