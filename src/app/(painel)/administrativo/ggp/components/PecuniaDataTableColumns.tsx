import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PecuniaDTO } from '@/types/Pecunia'
import { getFinancialAnnex } from '@/app/services/financialService'
import { AlignDiv } from '@/components/AlignDiv'

export function getPecuniaDataTableColumns(): ColumnDef<PecuniaDTO>[] {
  const GetAnnexFIle = async (id: number) => {
    try {
      const response = await getFinancialAnnex(id)
      window.open(response, '_blank')
    } catch (err) {
      throw new Error('Erro ao solicitar arquivo')
    }
  }

  return [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <AlignDiv>
            <Button
              className="text-left hover:bg-gray-100 dark:hover:bg-gray-800"
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
      accessorKey: 'servidor',
      header: () => <AlignDiv>Servidor</AlignDiv>,
      accessorFn: (row) => row?.nomeServidor || 'Campo não informado',
    },
    {
      accessorKey: 'lotacao',
      header: () => <AlignDiv>Lotacao</AlignDiv>,
      accessorFn: (row) => row.diretoriaNome || 'Campo não informado',
    },
    {
      accessorKey: 'Liquidacao',
      header: () => <AlignDiv>Liquidação</AlignDiv>,
      accessorFn: (row) => row.liquidacao,
      cell: (info) => (
        <div className="text-left">{info.row.original.liquidacao}</div>
      ),
    },
    {
      accessorKey: 'numerodeempenho',
      header: () => <AlignDiv>Número de Empenho</AlignDiv>,
      accessorFn: (row) => row.numeroEmpenho,
      cell: (info) => (
        <div className="text-left">{info.row.original.numeroEmpenho}</div>
      ),
    },
    {
      accessorKey: 'ordembancaria',
      header: () => <AlignDiv>Ordem Bancária</AlignDiv>,
      accessorFn: (row) => row.ob,
      cell: (info) => <div className="text-left">{info.row.original.ob}</div>,
    },
    {
      accessorKey: 'anexo',
      header: () => <AlignDiv>Anexo</AlignDiv>,
      cell: (item) => (
        <Button
          className="size-12 rounded-full bg-[#1E3C4D] text-white hover:bg-[#34647e]"
          onClick={() => GetAnnexFIle(item.row.original.id)}
        >
          <Printer />
        </Button>
      ),
    },
  ]
}
