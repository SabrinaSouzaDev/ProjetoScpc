import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Pen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScaleInfos } from '@/types/Scale'
import { StatusChip } from '@/components/StatusChip'
import { Dialog } from '@/components/Dialog'
import Form from './Form'
import { formatDate } from '@/utils/formatDate'

export function getColumns(): ColumnDef<ScaleInfos>[] {
  return [
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
      accessorKey: 'Devolução',
      header: () => (
        <div className="flex items-center justify-center">Devolução</div>
      ),
      cell: (item) => (
        <div className="flex items-center justify-center">
          {item.row.original?.observacaoDia || 'Em processo de avaliação...'}
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
    {
      accessorKey: 'relatorio',
      header: () => (
        <div className="flex items-end justify-center">Relatório</div>
      ),
      cell: (item) => (
        <div className="flex justify-center gap-3">
          <Dialog
            buttonTitle={<Pen />}
            className="size-12 rounded-full bg-[#1E3C4D] text-white hover:bg-[#34647e]"
            title="Cadastrar relatório"
            description="Preencha os campos abaixo para realizar o cadastro das informações de relatório"
            disabled={
              item.row.original?.status === 'DEFERIDO' ||
              item.row.original?.status === 'INDEFERIDO'
            }
          >
            <Form item={item.row.original} />
          </Dialog>
        </div>
      ),
    },
  ]
}
