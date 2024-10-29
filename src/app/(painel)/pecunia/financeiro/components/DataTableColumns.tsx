import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Pen, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { PecuniaDTO } from '@/types/Pecunia'
import { formatDate } from '@/utils/formatDate'
import { Dialog } from '@/components/Dialog'
import PecuniaForm from './PecuniaForm'
import { getFinancialAnnex } from '@/app/services/financialService'
import { AlignDiv } from '@/components/AlignDiv'

export function getColumns(isSubmitting: boolean): ColumnDef<PecuniaDTO>[] {
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
      id: 'selecionar',
      header: ({ table }) => (
        <div className="flex gap-3 px-1">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            disabled={isSubmitting}
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
              disabled={isSubmitting}
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
      accessorKey: 'servidorId',
      header: () => <AlignDiv>Servidor ID</AlignDiv>,
      accessorFn: (row) => row.creditos[0]?.idServidor,
    },
    {
      accessorKey: 'servidor',
      header: () => <AlignDiv>Servidor</AlignDiv>,
      accessorFn: (row) => row.nomeServidor,
    },
    {
      accessorKey: 'plantaoId',
      header: () => <AlignDiv>ID Plantão</AlignDiv>,
      accessorFn: (row) => row.creditos[0]?.plantao.id,
    },
    {
      accessorKey: 'lotacao',
      header: () => <AlignDiv>Lotação</AlignDiv>,
      accessorFn: (row) => row?.diretoriaNome || 'Campo não informado',
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
    {
      accessorKey: 'plantaoData',
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
      accessorKey: 'ordemBancaria',
      header: () => <AlignDiv>Ordem Bancária</AlignDiv>,
      accessorFn: (row) => row.ob || notFoundField,
    },
    {
      accessorKey: 'acoes',
      header: () => <AlignDiv>Ações</AlignDiv>,
      cell: (item) => (
        <div className="flex gap-3">
          <Dialog
            buttonTitle={<Pen />}
            className="size-12 rounded-full bg-[#1E3C4D] text-white hover:bg-[#34647e]"
            dialogClassName="min-w-[10rem] min-h-[30rem]"
            title="Atualizar dados financeiros"
            description="Preencha os campos abaixo para realizar a atualização das informações de financeiro"
          >
            <PecuniaForm pecuniaId={item.row.original.id} />
          </Dialog>

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
