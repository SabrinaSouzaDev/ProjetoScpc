'use client'

import {
  IconeDeferido,
  IconeDevolvido,
  IconeIndeferido,
  IconeSolicitacoes,
  IconeTodos,
  IconeTramitando,
} from '@/constants/Icons'

export const mockStatus = [
  {
    id: 1,
    numeros: 12,
    nome: 'Solicitações',
    footer: 'Em andamento',
    link: '/',
    color: 'bg-blue-700',
    icon: IconeSolicitacoes,
  },
  {
    id: 2,
    numeros: 31,
    nome: 'Tramitando',
    footer: 'Concluído',
    link: '/',
    color: 'bg-cyan-700',

    icon: IconeTramitando,
  },
  {
    id: 3,
    numeros: 11,
    nome: 'Deferido',
    footer: 'Concluído',
    link: '/',
    color: 'bg-green-700',
    icon: IconeDeferido,
  },
  {
    id: 4,
    numeros: 13,
    nome: 'Devolvido',
    footer: 'Concluído',
    link: '/',
    color: 'bg-orange-700',
    icon: IconeDevolvido,
  },
  {
    id: 5,
    numeros: 14,
    nome: 'Indeferido',
    footer: 'Concluído',
    link: '/',
    color: 'bg-red-700',

    icon: IconeIndeferido,
  },
  {
    id: 6,
    numeros: 16,
    nome: 'Todos',
    footer: 'Concluído',
    link: '/',
    color: 'bg-purple-700',
    icon: IconeTodos,
  },
  // Add more objects as needed
]
