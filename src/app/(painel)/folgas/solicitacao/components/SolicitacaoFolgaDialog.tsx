'use client'

import React from 'react'
import { Table } from '@tanstack/react-table'
import {
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

import { Check } from 'lucide-react'
import { SolicitacaoFolgaForm } from './SolicitacaoFolgaForm'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { CreditoDTO } from '@/types/Credito'

function canSolicitarFolga(creditos: CreditoDTO[]) {
  if (creditos.length === 2 && creditos[0].pesoMeio && creditos[1].pesoMeio) {
    return true
  }

  if (creditos.length === 1 && creditos[0].pesoDois) {
    return true
  }

  const pesoUm =
    creditos.length === 1 && !creditos[0].pesoMeio && !creditos[0].pesoDois

  if (pesoUm) {
    return true
  }

  return false
}
type SolicitarFolgaProps = {
  data: CreditoDTO[]
  table: Table<CreditoDTO>
  onSolicitarPecunha?: (selectedRows: { rows: Array<CreditoDTO> }) => void
}
export function SolicitacaoFolgaDialog({
  data,
  table,
}: Readonly<SolicitarFolgaProps>) {
  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is CreditoDTO => row !== undefined)
  const isDisabled = !canSolicitarFolga(selectedRows)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="default"
          disabled={isDisabled}
          className="dark: mb-4 w-full bg-green-500 text-white hover:bg-green-500/75 md:max-w-60"
        >
          <Check className="mr-1" size={20} color="#ffffff" />
          Solicitar Folga
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Folgas</DialogTitle>
          <DialogDescription>
            Selecione o dia de acordo com a quantidade de folgas solicitadas. O
            máximo é 1 folga por solicitação{' '}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mb-auto flex h-full justify-center overflow-y-auto pt-8">
          <div className="xs:h-[25dvh] max-[1700px]:h-[38dvh]md:max-w-2xl grid gap-2 py-2">
            <div className="flex flex-col">
              <SolicitacaoFolgaForm selectedRows={selectedRows} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
