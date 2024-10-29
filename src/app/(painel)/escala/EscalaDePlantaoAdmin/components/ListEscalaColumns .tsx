import { AlignDiv } from '@/components/AlignDiv'
import { ColumnDef } from '@tanstack/react-table'
import { EscalaPlantao } from '../type/AprovarEscalaPlatao'

export function getColumnsListEscala(): ColumnDef<EscalaPlantao>[] {
  return [
    {
      accessorKey: 'id',
      header: () => <AlignDiv>ID</AlignDiv>,
    },
    {
      accessorKey: 'diretoria.nome',
      header: () => <AlignDiv>Situação</AlignDiv>,
    },
    {
      accessorKey: 'status',
      header: () => <AlignDiv>Status</AlignDiv>,
    },
    {
      accessorKey: 'tipo',
      header: () => <AlignDiv>Tipo</AlignDiv>,
    },
  ]
}
