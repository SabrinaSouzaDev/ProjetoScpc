'use client'

import {
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table } from '@tanstack/react-table'
import { SolicitacaoDTO } from '@/types/Solicitacao'

type SolicitarStatusProps = {
  data: SolicitacaoDTO[]
  table: Table<SolicitacaoDTO>
  confirmRequest: (data: SolicitacaoDTO[]) => void
}

export default function SolicitacaoStatusDialog({
  data,
  table,
  confirmRequest,
}: SolicitarStatusProps) {
  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is SolicitacaoDTO => row !== undefined)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="dark: mb-4 w-full bg-red-500 text-white hover:bg-red-500/75 sm:max-w-52"
          size="sm"
          variant="default"
          disabled={!selectedRows.length}
        >
          <X className="mr-1" size={20} color="#ffffff" />
          <h1 className="text-[0.6rem] sm:text-[0.8rem] md:text-[0.9rem]">
            Cancelar Solicitação
          </h1>
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-w-[50rem] flex-col justify-between gap-8">
        <DialogHeader>
          <DialogTitle>Cancelar</DialogTitle>
          <DialogDescription>
            Caso os dados informados estejam corretos, clique no botão abaixo
            para confirmar.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-col rounded-lg border-b dark:bg-gray-800">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="block min-w-full sm:px-6 lg:px-8 ">
              <div className="overflow-hidden rounded-lg border-b border-gray-200 shadow dark:border-gray-700">
                <table className="min-w-full border border-gray-200 bg-white dark:border-gray-900 dark:bg-gray-800">
                  <caption className="my-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Informações de Crédito por Plantão
                  </caption>
                  <div className="h-72 max-[1700px]:w-full min-[396px]:min-w-52 md:w-full">
                    <ScrollArea className=" mb-auto h-full overflow-y-auto">
                      <thead>
                        <tr>
                          <th className="border-b px-3 py-2 text-gray-700 dark:text-gray-100">
                            ID
                          </th>
                          <th className="border-b px-3 py-2 text-gray-700 dark:text-gray-100">
                            Servidor
                          </th>
                          <th className="border-b px-3 py-2 text-gray-700 dark:text-gray-100">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white align-middle dark:bg-neutral-900 dark:text-white">
                        {selectedRows.map((item) => (
                          <tr
                            key={item.creditos[0]?.id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <td className="border-b px-6 py-2 text-gray-900 dark:text-gray-300">
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                                {item.creditos[0]?.id}
                              </div>
                            </td>
                            <td className="border-b px-6 py-2 text-gray-900 dark:text-gray-300">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {item.nomeServidor}
                              </div>
                            </td>
                            <td className="border-b px-6 py-2 text-gray-900 dark:text-gray-300">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {item.status}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td
                            colSpan={3}
                            className="py-2 text-center text-gray-600 dark:text-gray-400"
                          ></td>
                        </tr>
                      </tfoot>
                    </ScrollArea>
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
        <DialogClose asChild>
          <Button onClick={() => confirmRequest(selectedRows)}>
            Confirmar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
