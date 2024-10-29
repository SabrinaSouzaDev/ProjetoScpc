import Avatar from '../../../../../public/static/images/avatar.png'
// ComponentePerfil.tsx
import Image from 'next/image'
import { useSession } from 'next-auth/react'
// import { dados } from './constants/data'
export function ComponentePerfil() {
  const { data: session } = useSession()
  return (
    <div className="grid-cols-1 gap-4 md:col-span-1 md:grid-cols-2">
      <div className="border p-4 shadow-md">
        <Image
          width="64"
          height="64"
          alt={session?.user?.name ?? ''}
          src={session?.user?.image ?? Avatar}
          className="mx-auto mb-3 mt-2 border-spacing-3 rounded-full border-2 border-solid border-primary shadow-lg"
        />
        <h4 className="text-center text-lg font-bold lg:text-2xl">
          {session?.user?.name}
        </h4>
        <h5 className="text-center text-xs lg:text-lg">
          {session?.user?.resourceAccess?.scpc.roles[0]}
        </h5>
      </div>
    </div>
  )
}
