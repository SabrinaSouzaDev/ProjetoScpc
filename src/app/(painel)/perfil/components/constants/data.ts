import { Dado, User } from '../types/types'

export const dados: Dado[] = [
  { id: 1, label: 'Nome', content: 'FULANO DETAL' },
  { id: 3, label: 'Matrícula', content: '1111111' },
  { id: 4, label: 'CPF', content: '11111111111' },
  { id: 5, label: 'Orgão', content: 'SESPA' },
  { id: 6, label: 'Lotação', content: 'GABINETE DEFENSOR GERAL' },
  { id: 7, label: 'Setor', content: 'NTIC' },
  { id: 8, label: 'Função', content: 'ANALISTA DE SISTEMAS' },
  { id: 12, label: 'Login', content: 'FULANO.DETAL' },
  { id: 13, label: 'Perfil', content: 'ADMINISTRADOR' },
  { id: 14, label: 'Status', content: 'Ativo' },
]
export const texto: Dado[] = [
  { id: 7, label: 'Setor', content: 'NTIC' },
  { id: 8, label: 'Coordenação', content: 'Coordenação NTIC' },
  {
    id: 12,
    label: 'Diretoria',
    content: 'DIRETORIA DE INOVAÇÃO E TRANSFORMAÇÃO TECNOLOGICA',
  },
  { id: 13, label: 'Função', content: 'ANALISTA DE SISTEMAS' },
  { id: 14, label: 'Perfil', content: 'ADMINISTRADOR' },
]
export const users: User[] = [
  {
    id: 1,
    imageSrc: '/static/images/User-avatar.svg.png',
    name: 'FULANO.DETAL',
    role: 'ANALISTA DE SISTEMAS',
    sector: 'NTIC',
    coordination: 'COORDENAÇÃO NTIC',
    directorate: 'DIRETORIA DE INOVAÇÃO E TRANSFORMAÇÃO TECNOLOGICA',
    functionRole: 'ANALISTA DE SISTEMAS',
    profile: 'ADMINISTRADOR',
  },
  // Add more user data here...
]
