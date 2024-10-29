import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Pen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { formatDate } from '@/utils/formatDate'
import { PecuniaDTO } from '@/types/Pecunia'
import { Dialog } from '@/components/Dialog'
import NuplanForm from './NuplanForm'
import { AlignDiv } from '@/components/AlignDiv'

export function getColumns(isSubmitting: boolean): ColumnDef<PecuniaDTO>[] {
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
      accessorKey: 'ServidorId',
      header: () => <AlignDiv>Servidor ID</AlignDiv>,
      accessorFn: (row) => row.creditos[0]?.idServidor,
    },
    {
      accessorKey: 'servidor',
      header: () => <AlignDiv>Servidor</AlignDiv>,
      accessorFn: (row) => row.nomeServidor,
    },
    {
      accessorKey: 'creditoID',
      header: () => <AlignDiv>ID Crédito</AlignDiv>,
      accessorFn: (row) => row.creditos[0]?.id,
    },
    {
      accessorKey: 'lotacao',
      header: () => <AlignDiv>Lotação</AlignDiv>,
      accessorFn: (row) => row.diretoriaNome || 'Campo não informado',
    },
    {
      accessorKey: 'funcaoProgramática',
      header: () => <AlignDiv>Função Programática</AlignDiv>,
      accessorFn: (row) => row.funcaoProgramaticaId,
    },
    {
      accessorKey: 'gpPara',
      header: () => <AlignDiv>GP Pará</AlignDiv>,
      accessorFn: (row) => row.gpparaId,
    },
    {
      accessorKey: 'convenio',
      header: () => <AlignDiv>Convênio</AlignDiv>,
      accessorFn: (row) => row.convenioId,
    },
    {
      accessorKey: 'detalhamentoFonte',
      header: () => <AlignDiv>Detalhamento da Fonte</AlignDiv>,
      accessorFn: (row) => row.detalhamentoFonteId,
    },
    {
      accessorKey: 'naturezaDaDespesa',
      header: () => <AlignDiv>Natureza da Despesa</AlignDiv>,
      accessorFn: (row) => row.naturezaDespesaId,
    },
    {
      accessorKey: 'plantaoInterno',
      header: () => <AlignDiv>Plantão Interno</AlignDiv>,
      accessorFn: (row) => row.planoInternoId,
    },
    {
      accessorKey: 'valorUnitario',
      header: () => <AlignDiv>Valor Unitário</AlignDiv>,
      accessorFn: (row) => row.valorUnitario,
    },
    {
      accessorKey: 'plantaoInicio',
      header: () => <AlignDiv>Início do Plantão</AlignDiv>,
      accessorFn: (row) => formatDate(row.creditos[0]?.plantao.inicioPlantao),
    },
    {
      accessorKey: 'plantaoFim',
      header: () => <AlignDiv>Fim do Plantão</AlignDiv>,
      accessorFn: (row) => formatDate(row.creditos[0]?.plantao.fimPlantao),
    },
    {
      accessorKey: 'acoes',
      header: () => <AlignDiv>Ações</AlignDiv>,
      cell: (item) => (
        <div className="flex gap-3">
          <Dialog
            buttonTitle={<Pen />}
            className="size-12 rounded-full bg-[#1E3C4D] text-white hover:bg-[#34647e]"
            dialogClassName="min-w-[35rem] min-h-[30rem]"
            title="Atualizar dados nuplan"
            description="Preencha os campos abaixo para realizar a atualização das informações de nuplan"
          >
            <NuplanForm pecuniaId={item.row.original.id} />
          </Dialog>
        </div>
      ),
    },
  ]
}
