import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { calcularValorPeso } from '@/utils/CalcularValorPeso'
import { formatDate } from '@/utils/formatDate'
import { CreditoDTO } from '@/types/Credito'
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
      accessorKey: 'nomeServidor',
      header: () => <AlignDiv>Servidor</AlignDiv>,
    },
    {
      accessorKey: 'plantao.id',
      header: () => <AlignDiv>ID Plantão</AlignDiv>,
    },
    {
      accessorKey: 'plantaoInicio',
      header: () => <AlignDiv>Início do Plantão</AlignDiv>,
      accessorFn: (row) => formatDate(row.plantao.inicioPlantao),
    },
    {
      accessorKey: 'plantaoFim',
      header: () => <AlignDiv>Fim do Plantão</AlignDiv>,
      accessorFn: (row) => formatDate(row.plantao.fimPlantao),
    },
    {
      accessorKey: 'plantaoData',
      header: () => <AlignDiv>Data do Plantão</AlignDiv>,
      accessorFn: (row) => formatDate(row.dataCredito),
    },
    {
      accessorKey: 'creditoPeso',
      header: () => <AlignDiv>Peso do Crédito</AlignDiv>,
      accessorFn: (row) => calcularValorPeso(row?.pesoMeio, row?.pesoDois),
    },
  ]
}
