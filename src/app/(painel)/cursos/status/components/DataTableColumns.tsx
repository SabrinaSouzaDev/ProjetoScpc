import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CourseContentDTO } from '@/types/Course'
import { StatusChip } from '@/components/StatusChip'
import { AlignDiv } from '@/components/AlignDiv'

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
      accessorKey: 'curso',
      header: () => <AlignDiv>Curso</AlignDiv>,
      accessorFn: (row) => row.nome,
    },
    {
      accessorKey: 'cargahoraestimada',
      header: () => <AlignDiv>Carga Hora Estimada</AlignDiv>,
      accessorFn: (row) => row.cargaHorariaEstimada,
    },
    {
      accessorKey: 'cargahoraaceita',
      header: () => <AlignDiv>Carga Hora Aceita</AlignDiv>,
      accessorFn: (row) => row.cargaHorariaAceita || 'Informação não divulgada',
    },
    {
      accessorKey: 'servidor',
      header: () => <AlignDiv>Servidor</AlignDiv>,
      accessorFn: (row) => row.servidor.nome,
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
        <div className="flex items-center justify-center gap-3">
          <Button
            className="size-12 rounded-full bg-[#1E3C4D] text-white hover:bg-[#34647e]"
            onClick={() => GetAnnexFIle(item.row.original.resourceUrl)}
          >
            <Printer />
          </Button>
        </div>
      ),
    },
  ]
}
