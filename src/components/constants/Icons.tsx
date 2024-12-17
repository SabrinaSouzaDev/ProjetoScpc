import {
  AirplaneTilt,
  ArrowCounterClockwise,
  ArrowsLeftRight,
  CalendarDots,
  CheckSquare,
  Circle,
  Eye,
  Gauge,
  House,
  NotePencil,
  Trash,
  UsersFour,
  XCircle,
} from '@phosphor-icons/react/dist/ssr'

export const IconeCasa = <House size={24} className="mr-2" />
export const IconeUsuarios = <UsersFour size={24} className="mr-2" />
export const IconeCircle = <Circle size={19} className="mr-2" />
export const IconeGauge = <Gauge size={24} className="mr-2" />

// Icones CardButton.tsx

export const IconeSolicitacoes = <NotePencil size={96} className="mr-2" />
export const IconeTramitando = <ArrowsLeftRight size={96} className="mr-2" />
export const IconeDeferido = <CheckSquare size={96} className="mr-2" />
export const IconeDevolvido = (
  <ArrowCounterClockwise size={96} className="mr-2" />
)

export const IconeIndeferido = <XCircle size={96} className="mr-2" />

export const IconeTodos = <CalendarDots size={96} className="mr-2" />

export const IconeVisualizar = <Eye size={96} className="mr-2" />

// icones TableBUtton.tsx

export const IconeTrecho = (
  <AirplaneTilt weight="fill" size={15} color="#fff0f0" />
)

export const IconeDetalhes = <Eye weight="fill" size={15} color="#fff0f0" />

export const IconeExcluir = <Trash weight="fill" size={15} color="#fff0f0" />

export const IconeTramitacao = (
  <ArrowsLeftRight weight="fill" size={15} color="#fff0f0" />
)
