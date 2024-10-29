import { AlignDiv } from '@/components/AlignDiv'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { EscalaPlantao } from '../type/AprovarEscalaPlatao'

export function getColumnsEscala(): ColumnDef<EscalaPlantao>[] {
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
          <AlignDiv>
            <Button
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === 'asc')
              }}
            >
              ID
            </Button>
          </AlignDiv>
        )
      },
      footer: (props) => props.column.id,
      invertSorting: true,
    },
    {
      accessorKey: 'diretoria.nome',
      header: () => {
        return (
          <AlignDiv>
            <Button
              className="hover:bg-gray-100 dark:hover:bg-gray-800 "
              variant="ghost"
            >
              Diretoria
            </Button>
          </AlignDiv>
        )
      },
      footer: (props) => props.column.id,
    },
    {
      accessorKey: 'situacao',
      header: () => {
        return (
          <AlignDiv>
            <Button
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
              variant="ghost"
            >
              Situação atual
            </Button>
          </AlignDiv>
        )
      },
    },
    {
      accessorKey: 'status',
      header: () => {
        return (
          <AlignDiv>
            <Button
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
              variant="ghost"
            >
              Status
            </Button>
          </AlignDiv>
        )
      },
      footer: (props) => props.column.id,
    },
  ]
}
