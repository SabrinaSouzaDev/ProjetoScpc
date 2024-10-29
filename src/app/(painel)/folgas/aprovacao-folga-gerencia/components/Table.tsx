'use client'

import React from 'react'
import { getColumns } from './DataTableColumns'
import { consultaAprovarSolicitacaoFolga } from '@/app/services/server/ServiceAprovarFolga'
import { TitlePage } from '@/components/TitlePage'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useToast } from '@/components/ui/use-toast'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { TableWithouData } from '@/components/TableWithoutData'
import { ChangeFolgaStatus } from '../../changeFolgaStatus'
import { SolicitacaoFolgaDTO } from '@/types/Folga'

type TableProps = {
  folgaPromise: ReturnType<typeof consultaAprovarSolicitacaoFolga>
}

export function Table({ folgaPromise }: TableProps) {
  const [content, setContent] = React.useState<SolicitacaoFolgaDTO[]>([])
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const { toast } = useToast()
  const columns = React.useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<SolicitacaoFolgaDTO>[] = []

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
      folgaPromise.then((data) => {
        setContent(data.content)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        description: 'Ocorreu um erro ao solicitar os dados da pecúnia',
        duration: 3000,
      })
    }
  }

  React.useEffect(() => {
    getTableInfos()
  }, [])

  return (
    <div className="flex flex-col gap-7">
      <TitlePage title="Aprovação de Folga Gerência" />
      <div className="flex flex-row flex-wrap gap-5">
        <ChangeFolgaStatus table={table} data={content} action={'DEFERIR'} />
        <ChangeFolgaStatus table={table} data={content} action={'INDEFERIR'} />
      </div>
      {content ? (
        <DataTable table={table} filterFields={filterFields} />
      ) : (
        <TableWithouData />
      )}
    </div>
  )
}
