import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Status 404',
}

export default function NotFound() {
  return (
    <div className="bg-grey-50 flex h-screen flex-col items-center justify-center dark:bg-background">
      <h1 className=" l mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white sm:text-4xl md:text-6xl xl:text-8xl">
        404
      </h1>
      <h2 className=" l mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white sm:text-4xl md:text-6xl xl:text-8xl">
        Página não encontrada
      </h2>
      <p className="mt-10 text-2xl text-gray-600 dark:text-gray-200">
        Desculpe, não encontramos a página
      </p>

      <div className="mt-4 text-center">
        <p className="dark:text-grey-400 m-5 text-gray-600">
          Voltar para a página inicial:
        </p>

        <Button className="bg-black dark:bg-white " asChild>
          <Link
            className="h-12 w-32 text-xl text-white dark:text-black"
            href={routes.HOME}
          >
            Voltar
          </Link>
        </Button>
      </div>
    </div>
  )
}
