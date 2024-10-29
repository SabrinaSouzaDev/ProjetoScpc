import { UserConta } from '@/app/services/server/ServidorConta'
import { AlignDiv } from '@/components/AlignDiv'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'

export function getColumns(): ColumnDef<UserConta>[] {
  return [
    {
      id: 'selecionar',
      header: () => (
        <div className="flex gap-3 px-1">
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
      accessorKey: 'pessoa.conta.0.agencia.banco.nome',
      header: () => <AlignDiv>Nome do Banco</AlignDiv>,
      accessorFn: (row: UserConta) =>
        row.pessoa?.conta?.[0]?.agencia.banco.nome || 'N/A',
    },
    {
      accessorKey: 'pessoa.conta.0.bancoId',
      header: () => <AlignDiv>Número Banco</AlignDiv>,
      accessorFn: (row: UserConta) => row?.pessoa?.conta?.[0]?.bancoId || 'N/A',
    },
    {
      accessorKey: 'pessoa.conta.0.agenciaId',
      header: () => <AlignDiv>Agência</AlignDiv>,
      accessorFn: (row: UserConta) =>
        row?.pessoa?.conta?.[0]?.agenciaId || 'N/A',
    },
    {
      accessorKey: 'pessoa.conta.0.contaId',
      header: () => <AlignDiv>Conta</AlignDiv>,
      accessorFn: (row: UserConta) => row?.pessoa?.conta?.[0]?.contaId || 'N/A',
    },
  ]
}
