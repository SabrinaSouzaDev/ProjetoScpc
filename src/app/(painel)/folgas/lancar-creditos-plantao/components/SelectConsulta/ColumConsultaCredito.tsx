import { AlignDiv } from '@/components/AlignDiv'
import { CreditoPlantaoDTO } from '@/types/Credito'
import { calcularValorPeso } from '@/utils/CalcularValorPeso'
import { ColumnDef } from '@tanstack/react-table'
import { formatDate } from '@/utils/formatDate'

export function getColumnsDemostrativo(): ColumnDef<CreditoPlantaoDTO>[] {
  return [
    {
      accessorKey: 'id',
      header: () => <AlignDiv>ID</AlignDiv>,
    },
    {
      accessorKey: 'idPlantao',
      header: () => <AlignDiv>ID Plantão</AlignDiv>,
    },
    {
      accessorKey: 'dataCredito',
      header: () => <AlignDiv>Data do Plantão</AlignDiv>,
      accessorFn: (row) => formatDate(row.dataCredito.toString()),
    },
    {
      accessorKey: 'creditoPeso',
      header: () => <AlignDiv>Peso do Crédito</AlignDiv>,
      accessorFn: (row) => calcularValorPeso(row?.pesoMeio, row?.pesoDois),
    },
  ]
}
