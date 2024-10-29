import { Servidor } from '@/types/Servidor'

interface ServerListProps {
  serverList: number[]
  servidorList: Servidor[]
  handleRemoveServer: (server: string) => void
}

export function ServerList({
  serverList,
  servidorList,
  handleRemoveServer,
}: ServerListProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      {serverList.length > 0 ? (
        serverList.map((itemId) => {
          const servidor = servidorList.find(
            (servidor) => servidor.id === itemId,
          )

          return servidor ? (
            <div
              key={servidor.id}
              className="flex max-h-10 w-full max-w-[19rem] items-center justify-between rounded-full bg-gray-100 p-2 shadow-md dark:bg-gray-800"
            >
              <h2 className="max-w-56 truncate pl-4 text-[0.9rem] text-gray-900 dark:text-gray-200">
                {servidor.pessoa.nomeCompleto}
              </h2>

              <button
                onClick={() => handleRemoveServer(servidor.pessoa.nomeCompleto)}
                className="pr-6 text-lg text-red-600 transition hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
              >
                &times;
              </button>
            </div>
          ) : null
        })
      ) : (
        <p className="text-gray-500">Nenhum servidor selecionado</p>
      )}
    </div>
  )
}
