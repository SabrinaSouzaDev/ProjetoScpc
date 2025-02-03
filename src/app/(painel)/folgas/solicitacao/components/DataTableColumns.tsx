import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CreditoDTO } from '@/types/Credito'
import { calcularValorPeso } from '@/utils/CalcularValorPeso'
import { formatDate } from '@/utils/formatDate'
import { AlignDiv } from '@/components/AlignDiv'

export function getColumns(): ColumnDef<CreditoDTO>[] {
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
      footer: (props) => props.column.id,
      invertSorting: true,
    },
    {
      accessorKey: 'nomeServidor',
      header: () => <AlignDiv>Servidor</AlignDiv>,
    },
    {
      accessorKey: 'dataCredito',
      header: () => <AlignDiv>Data de Referência</AlignDiv>,
      accessorFn: (row) => formatDate(row.dataCredito),
    },
    {
      accessorFn: (row) => calcularValorPeso(row.pesoMeio, row.pesoDois),
      accessorKey: 'pesoCredito',
      header: () => <AlignDiv>Peso do Crédito</AlignDiv>,
    },
  ]
}
