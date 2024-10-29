'use client'

import { postFinancialAnnex } from '@/app/services/financialService'
import { getPecuniaInformations } from '@/app/services/pecuniaService'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useToast } from '@/components/ui/use-toast'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { PecuniaDTO } from '@/types/Pecunia'
import { ErrorMapping } from '@/utils/errorMapping'
import { objectToFormData } from '@/utils/objectToFormData'
import React from 'react'
import { getColumns } from './DataTableColumns'
import FinancialDialog from './FiancialDialog'
import { TableWithouData } from '@/components/TableWithoutData'

type TableProps = {
  pecuniaPromise: ReturnType<typeof getPecuniaInformations>
}

export function Table({ pecuniaPromise }: TableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [content, setContent] = React.useState<PecuniaDTO[]>([])
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const { toast } = useToast()
  const columns = React.useMemo(() => getColumns(isSubmitting), [isSubmitting])
  const [annexFile, setAnnexFile] = React.useState<File | null>(null)
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
      console.error('Erro ao buscar diretorias:', error)
      toast({
        variant: 'destructive',
        description: 'Ocorreu um erro ao solicitar os dados da pecúnia',
        duration: 3000,
      })
    }
  }
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null
    setAnnexFile(file)
  }
  async function handlePostAnnex(selectedRows: PecuniaDTO[]) {
    setIsSubmitting(true)
    let errorTreatment
    try {
      if (!annexFile) {
        throw new Error('Nenhum arquivo selecionado.')
      }
      if (selectedRows.length === 0) {
        throw new Error('Nenhuma linha selecionada para indeferimento.')
      }
      const requiredFields: (keyof PecuniaDTO)[] = [
        'numeroEmpenho',
        'ob',
        'liquidacao',
      ]
      const missingFields = selectedRows.filter((row) =>
        requiredFields.some((field) => !row[field]),
      )
      if (missingFields.length > 0) {
        throw new Error('Campos obrigatórios não preenchidos.')
      }
      const serversId = selectedRows.map((item) => item.id)
      const response = await postFinancialAnnex(
        serversId,
        objectToFormData({ arquivo: annexFile }),
      )
      if (response !== 'SUCCESS_UPDATE') {
        errorTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      } else {
        console.log(selectedRows)
      }
      await getTableInfos()
    } catch (error) {
      console.error('Erro ao realizar a solicitação de anexação:', error)
      ErrorMapping(errorTreatment || 'Ocorreu um erro')
      toast({
        variant: 'destructive',
        description:
          error instanceof Error ? error.message : 'Erro desconhecido.',
        duration: 3000,
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
      <FinancialDialog
        data={content}
        table={table}
        handleFileChange={handleFileChange}
        annexFile={annexFile}
        confirmRequest={handlePostAnnex}
        isDisabled={
          Object.keys(table.getState().rowSelection).length === 0 || // Desabilitar se nenhuma linha estiver selecionada
          Object.keys(table.getState().rowSelection).some((key) => {
            const selectedRow = content[parseInt(key)]
            return (
              !selectedRow.numeroEmpenho ||
              !selectedRow.ob ||
              !selectedRow.liquidacao
            )
          })
        }
      />

      {content ? (
        <DataTable table={table} filterFields={filterFields} />
      ) : (
        <TableWithouData />
      )}
    </>
  )
}
