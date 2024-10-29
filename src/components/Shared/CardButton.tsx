import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Eye } from 'lucide-react'

import Link from 'next/link'

type CardButtonTypes = {
  id: number
  numeros: number
  nome: string
  footer: string
  link: string
  color?: string
  icon?: JSX.Element
}

type CardButtonProps = { dados: CardButtonTypes[] }

export function CardButton({ dados }: CardButtonProps) {
  return (
    <div className="grid grid-flow-col gap-8 p-0 min-[100px]:grid-rows-3 sm:grid-rows-2 xl:grid-rows-1">
      {dados.map((status) => (
        <Card
          key={status.id}
          className={`h-[150px] w-auto rounded-2xl ${status.color}`}
        >
          <Link href={status.link}>
            <div className="flex h-full flex-col">
              {/* Card Header */}
              <div className="flex">
                <CardHeader className="">
                  <CardTitle className="pl-2 pt-2 text-5xl font-semibold text-white">
                    {status.numeros}
                  </CardTitle>
                </CardHeader>
                <div className="grow"></div>
                {/* Space to push CardContent to the right */}
                <CardContent className="z-0 p-0 text-white opacity-50 transition-transform duration-300 hover:scale-125">
                  {status.icon}
                </CardContent>
              </div>

              {/* Main content */}
              <CardHeader className="mb-auto pl-1 text-white">
                <CardTitle className="text-lg">{status.nome}</CardTitle>
              </CardHeader>

              {/* Card Footer */}
              <CardFooter className="mt-auto rounded-2xl rounded-t-none bg-black opacity-50">
                <div className="flex justify-center text-white">
                  <span>Visualizar</span>
                  {'  '}
                  <Eye size={20} className="ml-2 mt-1" />
                </div>
              </CardFooter>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}
