// types.ts
export interface User {
  id: number
  imageSrc: string
  name: string
  role: string
  sector: string
  coordination: string
  directorate: string
  functionRole: string
  profile: string
}

export interface dadosFuncionario {
  id: number
  label: string
  content: string
}

export interface ComponentePerfilProps {
  users: User[]
  dadosfuncionario: dadosFuncionario[]
}

export type Dado = {
  id: number
  label: string
  content: string
}

export type ComponenteMeusDadosProps = {
  dados: Dado[]
}
