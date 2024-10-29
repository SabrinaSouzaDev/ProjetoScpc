import { AlignDiv } from '@/components/AlignDiv'
import { ColumnDef } from '@tanstack/react-table'
import { EscalaPlantao } from '../TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'

export function getColumnsListEscala(): ColumnDef<EscalaPlantao>[] {
  return [
    {
      accessorKey: 'id',
      header: () => <AlignDiv>ID</AlignDiv>,
      accessorFn: (row) => row.id,
    },
    {
      accessorKey: 'diretoria.nome',
      header: () => <AlignDiv>status</AlignDiv>,
      accessorFn: (row) => row.status,
    },
    {
      accessorKey: 'status',
      header: () => <AlignDiv>Observação</AlignDiv>,
      accessorFn: (row) => row.observacao,
    },
    {
      accessorKey: 'tipo',
      header: () => <AlignDiv>Tipo</AlignDiv>,
      accessorFn: (row) => row.tipo,
    },
  ]
}
