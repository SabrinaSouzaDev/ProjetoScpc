import { ColumnDef } from '@tanstack/react-table'
import CheckboxComponent from '../components/CheckboxComponent'
import { Folgas } from '@/types/AprovaSolicitacaoDTO'

export const columns: ColumnDef<Folgas>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'button',
    header: 'Opções',
    cell: () => <CheckboxComponent />,
  },
  {
    accessorKey: 'dataSolicitada',
    header: 'Data',
  },

  {
    accessorKey: 'nomeServidor',
    header: 'Servidor',
  },
]

export const data: Folgas[] = [
  {
    id: 1,
    dataSolicitada: '12-03-2024',
    nomeServidor: 'Alice Silva',
  },
  {
    id: 2,
    dataSolicitada: '12-03-2024',
    nomeServidor: 'Bob Santos',
  },
  {
    id: 3,
    dataSolicitada: '12-03-2024',
    nomeServidor: 'Charlie Oliveira',
  },
  {
    id: 4,
    dataSolicitada: '12-03-2024',
    nomeServidor: 'Daniel Souza',
  },
  {
    id: 5,
    dataSolicitada: '12-03-2023',
    nomeServidor: 'Eduarda Lima',
  },
  {
    id: 6,
    dataSolicitada: '12-06-2024',
    nomeServidor: 'Fernando Costa',
  },
  {
    id: 7,
    dataSolicitada: '13-03-2024',
    nomeServidor: 'Gabriela Alves',
  },
  {
    id: 8,
    dataSolicitada: '12-04-2024',
    nomeServidor: 'Hugo Pereira',
  },
  {
    id: 9,
    dataSolicitada: '12-03-2024',
    nomeServidor: 'Isabela Rodrigues',
  },
  {
    id: 10,
    dataSolicitada: '12-03-2022',
    nomeServidor: 'João Carvalho',
  },
  {
    id: 11,
    dataSolicitada: '12-03-2024',
    nomeServidor: 'Karen Ferreira',
  },
  {
    id: 12,
    dataSolicitada: '12-03-2024',
    nomeServidor: 'Lucas Oliveira',
  },
  {
    id: 13,
    dataSolicitada: '12-03-2024',
    nomeServidor: 'Mariana Santos',
  },
  {
    id: 14,
    dataSolicitada: '12-03-2024',
    nomeServidor: 'Nathan Lima',
  },
  {
    id: 15,
    dataSolicitada: '12-03-2024',
    nomeServidor: 'Olívia Souza',
  },
  {
    id: 16,
    dataSolicitada: '12-03-2024',
    nomeServidor: 'Pedro Almeida',
  },
]
