import { CalendarForm } from '@/components/Shared/CalendarioForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { RowModel } from '@tanstack/react-table'
import { PlusSquare } from 'lucide-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { CreditoSolicitacaoDTO } from '@/types/Credito'

type SolicitarfolgasProps = {
  onSolicitarFolgas: (selectedRows: {
    rows: Array<RowModel<CreditoSolicitacaoDTO>>
  }) => void
  selectedRowsmodel: CreditoSolicitacaoDTO[]
}

export function DialogDemo({
  onSolicitarFolgas,
  selectedRowsmodel,
}: SolicitarfolgasProps) {
  const isDisabled =
    Object.keys(selectedRowsmodel).length > 1 ||
    Object.keys(selectedRowsmodel).length === 0
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="dark: mb-4  bg-green-500 text-white hover:bg-green-500/75"
          size="sm"
          variant="default"
          onClick={() => onSolicitarFolgas}
          disabled={isDisabled}
        >
          <PlusSquare className="mr-1" size={20} color="#ffffff" />
          Solicitar Folga
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Folga</DialogTitle>
          <DialogDescription>
            Selecione o dia de acordo com a quantidade de folga solicitada.{' '}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mb-auto flex h-full justify-center overflow-y-auto pt-8">
          <div className="xs:h-[25dvh] max-[1700px]:h-[38dvh]md:max-w-2xl grid gap-2 py-2">
            <div className="grid grid-cols-12 items-center gap-2">
              <CalendarForm selectedRowsmodel={selectedRowsmodel || []} />
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
