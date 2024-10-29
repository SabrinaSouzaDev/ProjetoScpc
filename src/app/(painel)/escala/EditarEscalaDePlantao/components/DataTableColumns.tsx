import { AlignDiv } from '@/components/AlignDiv'
import { Dialog } from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Pen } from '@phosphor-icons/react'
import { ColumnDef } from '@tanstack/react-table'
import AdicionarEscalaFiel from './FormEscala/AdicionarEscalaFiel'
import { EscalaGetResponse } from './TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'

export function getColumnsEscala(): ColumnDef<EscalaGetResponse>[] {
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
            </Button>
          </AlignDiv>
        )
      },
      footer: (props) => props.column.id,
      invertSorting: true,
    },
    {
      accessorKey: 'diretoria.nome',
      header: () => {
        return <AlignDiv>Diretoria</AlignDiv>
      },
      footer: (props) => props.column.id,
    },
    {
      accessorKey: 'situacao',
      header: () => {
        return <AlignDiv>Situação atual</AlignDiv>
      },
    },
    {
      accessorKey: 'status',
      header: () => {
        return <AlignDiv>Status</AlignDiv>
      },
      cell: (info) => (
        <div className="text-left">{info.row.original.status}</div>
      ),
      footer: (props) => props.column.id,
    },
    {
      accessorKey: 'escalasPlantaoDias.0.servidor.nome',
      header: () => {
        return <AlignDiv>Status</AlignDiv>
      },
      cell: (info) => (
        <div className="text-left">
          {info.row.original.escalasPlantaoDias?.[0].servidor?.nome}
        </div>
      ),
      footer: (props) => props.column.id,
    },
    {
      accessorKey: 'escalasPlantaoDias.0.dia.',
      header: () => {
        return <AlignDiv>Status</AlignDiv>
      },
      cell: (info) => (
        <div className="text-left">
          {info.row.original.escalasPlantaoDias?.[0].servidor?.nome}
        </div>
      ),
      footer: (props) => props.column.id,
    },
    {
      accessorKey: 'acoes',
      header: () => <AlignDiv>Adicionar</AlignDiv>,
      cell: (item) => (
        <div className="flex gap-3">
          <Dialog
            buttonTitle={<Pen />}
            className="rounded-full bg-[#3e9751] text-white hover:bg-[#165837]"
            dialogClassName="min-h-[20rem] max-w-[65rem] sm:w-5/6 md:w-full min-w-[300px] max-h-[98vh] overflow-y-auto-color overflow-x-auto-color"
            title="Atualizar dados Escala de plantão"
            description="Preencha os campos abaixo para realizar a atualização de informações do plantão"
          >
            <AdicionarEscalaFiel
              id={item.row.original.id}
              initialValues={item.row.original}
            />
          </Dialog>
        </div>
      ),
    },
  ]
}
