import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CourseContentDTO } from '@/types/Course'
import { formatDate } from '@/utils/formatDate'
import { AlignDiv } from '@/components/AlignDiv'
import { StatusChip } from '@/components/StatusChip'

export function getColumns(): ColumnDef<CourseContentDTO>[] {
  const GetAnnexFIle = async (url: string) => {
    try {
      window.open(url, '_blank')
    } catch (err) {
      throw new Error('Erro ao solicitar arquivo')
    }
  }
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
      cell: (item) => <AlignDiv>{item.row.original?.id}</AlignDiv>,
      invertSorting: true,
    },
    {
      accessorKey: 'servidor',
      header: () => <AlignDiv>Servidor</AlignDiv>,
      cell: (item) => <AlignDiv>{item.row.original?.servidor.nome}</AlignDiv>,
    },
    {
      accessorKey: 'diretoria',
      header: () => <AlignDiv>Diretoria</AlignDiv>,
      cell: (item) => <AlignDiv>{item.row.original?.diretoria.nome}</AlignDiv>,
    },
    {
      accessorKey: 'curso',
      header: () => <AlignDiv>Curso</AlignDiv>,
      cell: (item) => <AlignDiv>{item.row.original?.nome}</AlignDiv>,
    },
    {
      accessorKey: 'institiuicao',
      header: () => <AlignDiv>Instituição</AlignDiv>,
      cell: (item) => <AlignDiv>{item.row.original?.nomeInstituicao}</AlignDiv>,
    },
    {
      accessorKey: 'cargahoraestimada',
      header: () => <AlignDiv>Carga Hora Estimada</AlignDiv>,
      cell: (item) => (
        <AlignDiv>{item.row.original?.cargaHorariaEstimada}</AlignDiv>
      ),
    },
    {
      accessorKey: 'expedicao',
      header: () => <AlignDiv>Expedição</AlignDiv>,
      cell: (item) => (
        <AlignDiv>{formatDate(item.row.original?.dataExpedido)}</AlignDiv>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <AlignDiv>Status</AlignDiv>,
      cell: (item) => <StatusChip status={item.row.original?.situacao} />,
    },
    {
      accessorKey: 'certificado',
      header: () => <AlignDiv>Certificado</AlignDiv>,
      cell: (item) => (
        <AlignDiv>
          <Button
            className="size-12 rounded-full bg-[#1E3C4D] text-white hover:bg-[#34647e]"
            onClick={() => GetAnnexFIle(item.row.original?.resourceUrl)}
          >
            <Printer />
          </Button>
        </AlignDiv>
      ),
    },
  ]
}
