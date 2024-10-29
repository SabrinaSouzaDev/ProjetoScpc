import { getFinancialAnnex } from '@/app/services/financialService'
import { AlignDiv } from '@/components/AlignDiv'
import { Button } from '@/components/ui/button'
import { PecuniaDTO } from '@/types/Pecunia'
import { formatDate } from '@/utils/formatDate'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Printer } from 'lucide-react'

export function getColumns(): ColumnDef<PecuniaDTO>[] {
  const GetAnnexFIle = async (id: number) => {
    try {
      const response = await getFinancialAnnex(id)
      window.open(response, '_blank')
    } catch (err) {
      throw new Error('Erro ao solicitar arquivo')
    }
  }

  const notFoundField = 'Campo não informado'

  return [
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
      accessorKey: 'servidor',
      header: () => <AlignDiv>Servidor</AlignDiv>,
      accessorFn: (row) => row?.nomeServidor || notFoundField,
    },
    {
      accessorKey: 'Idplantao',
      header: () => <AlignDiv>ID Plantão</AlignDiv>,
      accessorFn: (row) => row.creditos[0]?.plantao.id,
    },
    {
      accessorKey: 'iniciodeplantao',
      header: () => <AlignDiv>Início de Plantão</AlignDiv>,
      accessorFn: (row) =>
        formatDate(row.creditos[0]?.plantao.inicioPlantao) || notFoundField,
    },
    {
      accessorKey: 'fimdeplantao',
      header: () => <AlignDiv>Fim de Plantão</AlignDiv>,
      accessorFn: (row) =>
        formatDate(row.creditos[0]?.plantao.fimPlantao) || notFoundField,
    },
    {
      accessorKey: 'datadoplantao',
      header: () => <AlignDiv>Data do Plantão</AlignDiv>,
      accessorFn: (row) =>
        formatDate(row.creditos[0]?.dataCredito) || notFoundField,
    },
    {
      accessorKey: 'liquidacao',
      header: () => <AlignDiv>Liquidação</AlignDiv>,
      accessorFn: (row) => row.liquidacao || notFoundField,
    },
    {
      accessorKey: 'empenho',
      header: () => <AlignDiv>Empenho</AlignDiv>,
      accessorFn: (row) => row.numeroEmpenho || notFoundField,
    },
    {
      accessorKey: 'ordembancaria',
      header: () => <AlignDiv>Ordem Bancária</AlignDiv>,
      accessorFn: (row) => row.ob || notFoundField,
    },
    {
      accessorKey: 'Acoes',
      header: () => <AlignDiv>Ações</AlignDiv>,
      cell: (item) => (
        <div className="flex gap-3">
          <Button
            className="size-12 rounded-full bg-[#1E3C4D] text-white hover:bg-[#34647e]"
            onClick={() => GetAnnexFIle(item.row.original.id)}
          >
            <Printer />
          </Button>
        </div>
      ),
    },
  ]
}
