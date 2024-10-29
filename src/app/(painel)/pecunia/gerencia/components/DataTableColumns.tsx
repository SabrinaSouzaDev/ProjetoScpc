import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { formatDate } from '@/utils/formatDate'
import { PecuniaDTO } from '@/types/Pecunia'
import { AlignDiv } from '@/components/AlignDiv'

export function getColumns(): ColumnDef<PecuniaDTO>[] {
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
      footer: (props) => props.column.id,
    },
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
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
        )
      },
      invertSorting: true,
    },
    {
      accessorKey: 'ID',
      header: () => <AlignDiv>Servidor ID</AlignDiv>,
      accessorFn: (row) => row.creditos[0]?.idServidor,
    },
    {
      accessorKey: 'servidor',
      header: () => <AlignDiv>Servidor</AlignDiv>,
      accessorFn: (row) => row.nomeServidor,
    },
    {
      accessorKey: 'credito',
      header: () => <AlignDiv>ID Crédito</AlignDiv>,
      accessorFn: (row) => row.creditos[0]?.id,
    },
    {
      accessorKey: 'valorUnitario',
      header: () => <AlignDiv>Valor Unitário</AlignDiv>,
      accessorFn: (row) => row?.valorUnitario,
    },
    {
      accessorKey: 'plantaoIncio',
      header: () => <AlignDiv>Início do Plantão</AlignDiv>,
      accessorFn: (row) => formatDate(row.creditos[0]?.plantao.inicioPlantao),
    },
    {
      accessorKey: 'plantaoFim',
      header: () => <AlignDiv>Fim do Plantão</AlignDiv>,
      accessorFn: (row) => formatDate(row.creditos[0]?.plantao.fimPlantao),
    },
  ]
}
