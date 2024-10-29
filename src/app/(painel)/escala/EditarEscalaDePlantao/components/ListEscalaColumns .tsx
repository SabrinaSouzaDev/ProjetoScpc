import { AlignDiv } from '@/components/AlignDiv'
import { ColumnDef } from '@tanstack/react-table'
import { EscalaPlantao } from './TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'

export function getColumnsListEscalaEdit(): ColumnDef<EscalaPlantao>[] {
  const notFoundField = 'Campo não informado'
  return [
    {
      accessorKey: 'id',
      header: () => <AlignDiv>ID</AlignDiv>,
    },
    {
      accessorKey: 'tipo',
      header: () => <AlignDiv>Tipo</AlignDiv>,
      accessorFn: (row) => row?.tipo || notFoundField,
    },
    {
      accessorKey: 'diretoria.nome',
      header: () => <AlignDiv>Diretoria</AlignDiv>,
      accessorFn: (row) => row?.diretoria?.nome || notFoundField,
    },
    {
      accessorKey: 'escalasPlantaoDias',
      header: () => <AlignDiv>Servidor</AlignDiv>,
      accessorFn: (row) =>
        row?.escalasPlantaoDias?.[0].servidor?.nome || notFoundField,
    },
    {
      accessorKey: 'escalasPlantaoDias',
      header: () => <AlignDiv>Dia</AlignDiv>,
      accessorFn: (row) =>
        row?.escalasPlantaoDias?.[0].dia?.dia || notFoundField,
    },
  ]
}
