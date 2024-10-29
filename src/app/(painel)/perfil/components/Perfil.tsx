'use client'
import { signIn, useSession } from 'next-auth/react'
import { ComponentePerfil } from './ComponentePerfil'
// import Creditos from './Creditos'

export function Perfil() {
  const session = useSession()
  if (session.status === 'unauthenticated' || session === null) {
    signIn()
  }
  return (
    <div className="block items-center justify-items-center gap-5">
      <ComponentePerfil />
      {/* <Creditos /> */}
    </div>
  )
}
