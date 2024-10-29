'use client'

import React from 'react'
import { Table } from '@tanstack/react-table'
import {
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { SolicitacaoCreditoDTO } from '@/types/Credito'
import { Check, Checks } from '@phosphor-icons/react'

type SolicitarFolgaProps = {
  data: SolicitacaoCreditoDTO[]
  onAprovarFolga: (data: SolicitacaoCreditoDTO[]) => void
  table: Table<SolicitacaoCreditoDTO>
}
export function SolicitacaoFolgaDialog({
  data,
  table,
  onAprovarFolga,
}: Readonly<SolicitarFolgaProps>) {
  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is SolicitacaoCreditoDTO => row !== undefined)
  const isDisabled = selectedRows.length === 0
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full gap-2 md:flex md:max-w-60">
        <Button
          className="dark: mb-4 bg-green-500 text-[0.8rem] text-white hover:bg-green-500/75 md:text-[1rem]"
          size="sm"
          variant="default"
          disabled={isDisabled}
        >
          <Check size={20} />
          Gerar portaria de folga
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Folgas</DialogTitle>
          <DialogDescription>Previa dos dados selecionados.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="mb-auto flex h-full justify-center overflow-y-auto pt-8">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-300">
                    Id
                  </th>
                  <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-300">
                    Diretoria
                  </th>
                  <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-300">
                    Servidor
                  </th>
                  <th className="border-b px-4 py-2 text-gray-700 dark:text-gray-300">
                    Observação
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedRows.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                      {row.id}
                    </td>
                    <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                      {row.diretoriaDTO?.nome}
                    </td>
                    <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                      {row.nomeServidor}
                    </td>
                    <td className="border-b px-4 py-2 text-gray-900 dark:text-gray-300">
                      {row.observacao}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="dark: mb-4 flex gap-2 text-white dark:bg-primary/35 dark:hover:bg-primary/50"
              size="sm"
              variant="default"
              onClick={() => onAprovarFolga(selectedRows)}
            >
              <Checks size={32} />
              Gerar portaria de folga
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
