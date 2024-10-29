import { AlignDiv } from '@/components/AlignDiv'
import { CreditoDTO } from '@/types/Credito'
import { calcularValorPeso } from '@/utils/CalcularValorPeso'
import { ColumnDef } from '@tanstack/react-table'
import { formatDate } from '@/utils/formatDate'

export function getColumnsDemostrativo(): ColumnDef<CreditoDTO>[] {
  return [
    {
      accessorKey: 'nomeServidor',
      header: () => <AlignDiv>Servidor</AlignDiv>,
    },
    {
      accessorKey: 'plantao.id',
      header: () => <AlignDiv>ID Plantão</AlignDiv>,
    },
    {
      accessorKey: 'plantaoData',
      header: () => <AlignDiv>Data do Plantão</AlignDiv>,
      accessorFn: (row) => formatDate(row.dataCredito),
    },
    {
      accessorKey: 'creditoPeso',
      header: () => <AlignDiv>Peso do Crédito</AlignDiv>,
      accessorFn: (row) => calcularValorPeso(row?.pesoMeio, row?.pesoDois),
    },
  ]
}
