import { KeyRound, ShieldAlert } from 'lucide-react'
import React from 'react'

enum Permissions {
  ADMINISTRADOR = 'ADMINISTRADOR',
  ESCOLA = 'ESCOLA',
  DIRETORIA = 'DIRETORIA',
  ADMINISTRATIVO = 'ADMINISTRATIVO',
  ACESSO = 'ACESSO',
  COORDENACAO = 'COORDENACAO',
}

type PermissionType = keyof typeof Permissions

export function WarningMessageRoles() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-[1.2rem] font-bold tracking-wide text-black dark:text-white sm:text-[1.6rem] md:text-[1.8rem]">
        Você não possui as permissões necessárias para ver essa funcionalidade.
        Informe a diretoria!
      </h1>

      <ShieldAlert className="size-10 sm:size-16 md:size-20" />
    </div>
  )
}
export function WarningMessageId() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-[1.2rem] font-bold tracking-wide text-black dark:text-white sm:text-[1.6rem] md:text-[1.8rem]">
        Identificador de usuário não encontrado na base de dados, informar a
        administração acerca desse problema
      </h1>

      <KeyRound className="size-10 text-black dark:text-white sm:size-12 md:size-16" />
    </div>
  )
}

export default function permissionsMapping(roles?: string[]) {
  if (!roles) {
    return <WarningMessageRoles />
  }

  const permissionValues: PermissionType[] = Object.keys(
    Permissions,
  ) as PermissionType[]
  const rolesSet = new Set(roles)

  const hasPermission = Array.from(rolesSet).some((role) =>
    permissionValues.includes(role as PermissionType),
  )

  if (!hasPermission) {
    return <WarningMessageRoles />
  }
}
