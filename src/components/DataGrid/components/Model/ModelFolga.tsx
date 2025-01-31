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
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { PlusSquare } from 'lucide-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Solicitacao } from '../../ContentDatagrid'

type SolicitarfolgasProps = {
  onSolicitarFolgas: (selectedRows: {
    rows: Array<RowModel<Solicitacao>>
  }) => void
  selectedRowsmodel: Solicitacao[]
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
          className="dark: mb-4 text-white dark:bg-primary/35 dark:hover:bg-primary/50"
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
          <DialogTitle>Folgas</DialogTitle>
          <DialogDescription>
            Selecione o dia de acordo com a quantidade de folgas solicitadas. O
            máximo são 5 folgas por solicitação{' '}
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
