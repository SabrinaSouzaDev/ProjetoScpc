'use client'
import { Dialog } from '@/components/Dialog'
import TableBodyInfos from './TableBodyInfos'
import { CourseContentDTO } from '@/types/Course'
import { Table } from '@tanstack/react-table'
import { updateCourseStatus } from '@/app/services/courseService'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ErrorMapping } from '@/utils/errorMapping'

interface CourseDialogProps {
  isAprove: boolean
  data: CourseContentDTO[]
  table: Table<CourseContentDTO>
}

export function CourseDialog({ isAprove, data, table }: CourseDialogProps) {
  const [observation, setObservation] = React.useState<string>('')
  const selectedRows = Object.keys(table.getState().rowSelection)
    .map((key) => data.find((row, index) => index === Number(key)))
    .filter((row): row is CourseContentDTO => row !== undefined)
  const { toast } = useToast()

  async function handleUpdateCourseStatus(selectedRows: CourseContentDTO[]) {
    let errorTreatment
    try {
      const { id, cargaHorariaEstimada } = selectedRows[0]

      const response = await updateCourseStatus({
        id,
        cargaHorariaAceita: cargaHorariaEstimada,
        situacao: isAprove ? 'DEFERIDO' : 'INDEFERIDO',
        observacao: isAprove ? undefined : observation,
      })

      if (response !== 'SUCCESS_UPDATE') {
        errorTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      setObservation('')
      toast({
        description: 'Alteração realizada com sucesso',
        duration: 3000,
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        description: errorTreatment || 'Ocorreu um erro ao realizar alteração',
        duration: 3000,
      })
    }
  }

  return isAprove ? (
    <div>
      <Dialog
        buttonTitle="Deferir"
        className="h-10 w-28 bg-green-600 text-white hover:bg-green-700"
        title="Deferir solicitação"
        description="Verifique se os campos abaixo estão corretos, caso estejam corretos clique em confirmar"
        disabled={!selectedRows.length || selectedRows.length > 1}
      >
        <TableBodyInfos selectedRows={selectedRows} />

        <DialogClose asChild>
          <Button
            className="bg-green-700 text-white hover:bg-green-800"
            onClick={() => handleUpdateCourseStatus(selectedRows)}
          >
            Confirmar solicitação
          </Button>
        </DialogClose>
      </Dialog>
    </div>
  ) : (
    <div>
      <Dialog
        buttonTitle="Indeferir"
        className="h-10 w-28 bg-red-600 text-white hover:bg-red-700"
        title="Indeferir solicitação"
        description="Verifique se os campos abaixo estão corretos, caso estejam corretos clique em confirmar"
        disabled={!selectedRows.length || selectedRows.length > 1}
      >
        <TableBodyInfos selectedRows={selectedRows} />

        <label>Observação</label>
        <Input
          placeholder="Insinar o motivo abaixo"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
        />

        <DialogClose asChild>
          <Button
            className="mt-1 bg-green-700 text-white hover:bg-green-800"
            disabled={!observation}
            onClick={() => handleUpdateCourseStatus(selectedRows)}
          >
            Confirmar solicitação
          </Button>
        </DialogClose>
      </Dialog>
    </div>
  )
}
