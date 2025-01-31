import { routes } from '@/constants/routes'
import { NavbarItem } from '@/types/NavbarItem'

import { IconeCasa, IconeCircle, IconeGauge } from './Icons'

export const SidebarData: NavbarItem[] = [
  {
    id: 1,
    permissoes: [],
    title: 'Página Inicial',
    url: routes.HOME,
    icon: IconeCasa,
    subItems: [],
  },
  {
    id: 2,
    permissoes: [],
    title: 'Administrador',
    url: '#',
    icon: IconeGauge,
    subItems: [
      // {
      //   id: 21,
      //   permissoes: ['ADMIN'],
      //   subtitle: 'Lançar Folgas',
      //   suburl: routes.SETORES,
      //   icon: IconeCircle,
      // },
      {
        id: 22,
        permissoes: ['DIRETORIA'],
        subtitle: 'Lançar Créditos',
        suburl: routes.LANCAR_FOLGA_DIR,
        icon: IconeCircle,
      },
      {
        id: 23,
        permissoes: ['ESCOLA'],
        subtitle: 'Lançar Créditos Escola',
        suburl: routes.LANCAR_FOLGA_ESP,
        icon: IconeCircle,
      },
      {
        id: 24,
        permissoes: ['DIRETORIA'],
        subtitle: 'Aprovar Folgas',
        suburl: routes.APROVAR_FOLGAS,
        icon: IconeCircle,
      },
    ],
  },
  //
  // {
  //   id: 3,
  //   permissoes: GERENCIA_VALUES,
  //   title: 'Área do Usuário',
  //   url: '#',
  //   icon: IconeUsers,
  //   subItems: [
  //     {
  //       id: 31,
  //       permissoes: ['ADMIN'],
  //       subtitle: 'Adicionar Certificado',
  //       suburl: routes.CERTICICADO,
  //       icon: IconeCircle,
  //     },
  //     {
  //       id: 32,
  //       permissoes: ['ADMIN'],
  //       subtitle: 'Solicitações',
  //       suburl: routes.SOLICITACAO,
  //       icon: IconeCircle,
  //     },
  //     // {
  //     //   id: 33,
  //     //   permissoes: ['ADMIN'],
  //     //   subtitle: 'teste',
  //     //   suburl: routes.TESTE,
  //     //   icon: IconeCircle,
  //     // },
  //   ],
  // },
]
