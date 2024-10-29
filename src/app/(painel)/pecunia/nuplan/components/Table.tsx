'use client'

import { getPecuniaInformations } from '@/app/services/pecuniaService'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useToast } from '@/components/ui/use-toast'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { PecuniaDTO } from '@/types/Pecunia'
import defaultReloadPage from '@/utils/reload'
import React from 'react'
import PecuniaFunctions from '../../functions/PecuniaFunctions'
import PecuniaDialog from './ChangePecuniaStatusDialog'
import { getColumns } from './DataTableColumns'
import { TableWithouData } from '@/components/TableWithoutData'

type TableProps = {
  pecuniaPromise: ReturnType<typeof getPecuniaInformations>
}

export function Table({ pecuniaPromise }: TableProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [observation, setObservation] = React.useState('')
  const [content, setContent] = React.useState<PecuniaDTO[]>([])
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const { toast } = useToast()
  const { handleUpdatePecuniaStatus } = PecuniaFunctions()
  const columns = React.useMemo(() => getColumns(isSubmitting), [isSubmitting])

  const filterFields: DataTableFilterField<PecuniaDTO>[] = []

  const { table } = useDataTable({
    data: content,
    columns,
    pageCount: totalPages,
    rowCount: totalElements,
    filterFields,
    defaultSize: 25,
  })

  async function getTableInfos() {
    try {
      pecuniaPromise.then((data) => {
        setContent(data.content)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
      })
    } catch (error) {
      return (
        <ErrorMessage
          title="Falha na requisição"
          message="Não foi possível conectar ao servidor."
        />
      )
    }
  }

  async function handleConfirmRequest(selectedRows: PecuniaDTO[]) {
    setIsSubmitting(true)
    try {
      if (selectedRows.length === 0) {
        throw new Error('Nenhuma linha selecionada para indeferimento.')
      }

      const requiredFields: (keyof PecuniaDTO)[] = [
        'detalhamentoFonteId',
        'funcaoProgramaticaId',
        'gpparaId',
        'naturezaDespesaId',
        'planoInternoId',
      ]
      const missingFields = selectedRows.filter((row) =>
        requiredFields.some((field) => !row[field]),
      )

      if (missingFields.length > 0) {
        throw new Error('Campos obrigatórios não preenchidos.')
      }
      const isMultipleRows = selectedRows.length > 1

      if (isMultipleRows) {
        const mappedIds = selectedRows.map((item) => item.id)
        await Promise.all(
          mappedIds.map(async (id) => {
            await handleUpdatePecuniaStatus(id, 'DEFERIDO')
            defaultReloadPage()
          }),
        )
      } else {
        const selectedRow = selectedRows[0]
        await handleUpdatePecuniaStatus(selectedRow.id, 'DEFERIDO')
        defaultReloadPage()
      }
      await getTableInfos()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao realizar a solicitação de indeferimento.',
        description:
          error instanceof Error ? error.message : 'Erro desconhecido.',
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleRefuseRequest(selectedRows: PecuniaDTO[]) {
    setIsSubmitting(true)
    try {
      if (selectedRows.length === 0) {
        throw new Error('Nenhuma linha selecionada para indeferimento.')
      }

      const requiredFields: (keyof PecuniaDTO)[] = [
        'detalhamentoFonteId',
        'funcaoProgramaticaId',
        'gpparaId',
        'naturezaDespesaId',
        'planoInternoId',
      ]
      const missingFields = selectedRows.filter((row) =>
        requiredFields.some((field) => !row[field]),
      )

      if (missingFields.length > 0) {
        throw new Error('Campos obrigatórios não preenchidos.')
      }
      const isMultipleRows = selectedRows.length > 1

      if (isMultipleRows) {
        const mappedIds = selectedRows.map((item) => item.id)
        await Promise.all(
          mappedIds.map(async (id) => {
            await handleUpdatePecuniaStatus(id, 'INDEFERIDO', observation)
            defaultReloadPage()
          }),
        )
      } else {
        const selectedRow = selectedRows[0]
        await handleUpdatePecuniaStatus(
          selectedRow.id,
          'INDEFERIDO',
          observation,
        )
        defaultReloadPage()
      }

      await getTableInfos()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao realizar a solicitação de indeferimento.',
        description:
          error instanceof Error ? error.message : 'Erro desconhecido.',
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  async function handleReturnRequest(selectedRows: PecuniaDTO[]) {
    setIsSubmitting(true)
    try {
      if (selectedRows.length === 0) {
        throw new Error('Nenhuma linha selecionada para indeferimento.')
      }
      const requiredFields: (keyof PecuniaDTO)[] = [
        'detalhamentoFonteId',
        'funcaoProgramaticaId',
        'gpparaId',
        'naturezaDespesaId',
        'planoInternoId',
      ]
      const missingFields = selectedRows.filter((row) =>
        requiredFields.some((field) => !row[field]),
      )
      if (missingFields.length > 0) {
        throw new Error('Campos obrigatórios não preenchidos.')
      }

      const isMultipleRows = selectedRows.length > 1
      if (isMultipleRows) {
        const mappedIds = selectedRows.map((item) => item.id)
        await Promise.all(
          mappedIds.map(async (id) => {
            await handleUpdatePecuniaStatus(id, 'INDEFERIDO')
            defaultReloadPage()
          }),
        )
      } else {
        const selectedRow = selectedRows[0]
        await handleUpdatePecuniaStatus(selectedRow.id, 'INDEFERIDO')
        defaultReloadPage()
      }
      await getTableInfos()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao realizar a solicitação de indeferimento.',
        description:
          error instanceof Error ? error.message : 'Erro desconhecido.',
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  React.useEffect(() => {
    getTableInfos()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row flex-wrap gap-5 ">
          <PecuniaDialog
            action="DEFERIR"
            data={content}
            table={table}
            confirmRequest={handleConfirmRequest}
            className="w-full bg-green-500 text-white hover:bg-green-500/75 md:max-w-60"
            isDisabled={
              Object.keys(table.getState().rowSelection).length === 0 ||
              Object.keys(table.getState().rowSelection).some((key) => {
                const selectedRow = content[parseInt(key)]
                return (
                  !selectedRow?.detalhamentoFonteId ||
                  !selectedRow?.funcaoProgramaticaId ||
                  !selectedRow?.gpparaId ||
                  !selectedRow?.naturezaDespesaId ||
                  !selectedRow?.planoInternoId
                )
              })
            }
          />

          <PecuniaDialog
            action="INDEFERIR"
            data={content}
            table={table}
            observation={observation}
            setObservation={setObservation}
            confirmRequest={handleRefuseRequest}
            className="w-full bg-red-500 text-white hover:bg-red-500/75 md:max-w-60"
            isDisabled={
              Object.keys(table.getState().rowSelection).length === 0 ||
              Object.keys(table.getState().rowSelection).some((key) => {
                const selectedRow = content[parseInt(key)]
                return (
                  !selectedRow?.detalhamentoFonteId ||
                  !selectedRow?.funcaoProgramaticaId ||
                  !selectedRow?.gpparaId ||
                  !selectedRow?.naturezaDespesaId ||
                  !selectedRow?.planoInternoId
                )
              })
            }
          />

          <PecuniaDialog
            action="DEVOLVER"
            data={content}
            table={table}
            confirmRequest={handleReturnRequest}
            className="w-full bg-yellow-500 text-white hover:bg-yellow-500/75 md:max-w-60"
            isDisabled={
              Object.keys(table.getState().rowSelection).length === 0 ||
              Object.keys(table.getState().rowSelection).some((key) => {
                const selectedRow = content[parseInt(key)]
                return (
                  !selectedRow?.detalhamentoFonteId ||
                  !selectedRow?.funcaoProgramaticaId ||
                  !selectedRow?.gpparaId ||
                  !selectedRow?.naturezaDespesaId ||
                  !selectedRow?.planoInternoId
                )
              })
            }
          />
        </div>

        {content ? (
          <DataTable table={table} filterFields={filterFields} />
        ) : (
          <TableWithouData />
        )}
      </div>
    </>
  )
}
