'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { signOut, useSession } from 'next-auth/react'

export function DropdownMenuComponent() {
  const { data: session } = useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex shrink items-center space-x-2 justify-self-end hover:inline-flex">
          <Avatar className="cursor-pointer rounded-lg">
            <AvatarImage
              alt={session?.user?.name ?? ''}
              src={
                session?.user?.image ??
                '../../../public/static/images/avatarUser.jpg'
              }
            />
            <AvatarFallback>
              <AvatarFallback>
                {session?.user?.name?.substring(0, 2) ?? ''}
              </AvatarFallback>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h5 className="hidden text-sm font-semibold text-white dark:text-slate-50 sm:inline ">
              {session?.user?.name}
            </h5>
            <h5 className=" leading-2 hidden text-sm font-semibold text-white dark:text-slate-50 sm:inline [&:not(:first-child)]:mt-1">
              {session?.user?.resourceAccess?.scpc?.roles[0]}
            </h5>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-40 mr-20 mt-2 w-56 gap-4 rounded-md bg-white/30 p-4 shadow-md backdrop-blur-xl dark:bg-neutral-800">
        <DropdownMenuLabel className="mb-2 text-lg font-bold">
          Minha conta
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="mt-2">
          <Button
            color="primary"
            className="w-full rounded p-2 font-bold dark:text-white"
            onClick={() => signOut()}
          >
            Sair da conta
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
