import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SolicitacaoDTO } from '@/types/Solicitacao'
import { formatDate } from '@/utils/formatDate'
import { AlignDiv } from '@/components/AlignDiv'

export function getColumns(): ColumnDef<SolicitacaoDTO>[] {
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
      accessorFn: (row) => row.nomeServidor || 'Campo não informado',
    },
    { accessorKey: 'status', header: 'Status' },
    {
      accessorKey: 'dataSolicitacao',
      header: () => <AlignDiv>Data da Solicitação</AlignDiv>,
      accessorFn: (row) => formatDate(row.dataSolicitacao),
    },
    {
      accessorKey: 'credito.plantao.inicioPlantao',
      header: 'Início do plantão',
      accessorFn: (row) => formatDate(row.creditos[0].plantao.inicioPlantao),
    },
    {
      accessorKey: 'credito.plantao.fimPlantao',
      header: 'Final do Plantão',
      accessorFn: (row) => formatDate(row.creditos[0].plantao.inicioPlantao),
    },
  ]
}
