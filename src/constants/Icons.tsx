import {
  ArrowCounterClockwise,
  ArrowsLeftRight,
  CheckSquare,
  Circle,
  Eye,
  Gauge,
  GridNine,
  House,
  NotePencil,
  Users,
  UsersFour,
  XCircle,
} from '@phosphor-icons/react/dist/ssr'

export const IconeCasa = <House size={24} className="mr-2" />
export const IconeUsuarios = <UsersFour size={24} className="mr-2" />
export const IconeCircle = <Circle size={19} className="mr-2" />
export const IconeGauge = <Gauge size={24} className="mr-2" />

export const IconeUsers = <Users size={32} />

// Icones CardButto.tsx

export const IconeSolicitacoes = <NotePencil size={96} className="mr-2" />
export const IconeTramitando = <ArrowsLeftRight size={96} className="mr-2" />
export const IconeDeferido = <CheckSquare size={96} className="mr-2" />
export const IconeDevolvido = (
  <ArrowCounterClockwise size={96} className="mr-2" />
)

export const IconeIndeferido = <XCircle size={96} className="mr-2" />

export const IconeTodos = <GridNine size={96} className="mr-2" />

export const IconeVisualizar = <Eye size={96} className="mr-2" />
