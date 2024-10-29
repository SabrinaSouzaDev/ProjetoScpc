'use client'

import React from 'react'
import { getColumns } from './DataTableColumns'
import { consultaCreditosServidor } from '@/app/services/server/ScpcServiceServer'
import { CreditoDTO } from '@/types/Credito'
import { DataTableFilterField } from '@/types'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useDataTable } from '@/hooks/useDataTable'
import { SolicitacaoFolgaDialog } from './SolicitacaoFolgaDialog'

type TableProps = {
  creditosFolgasPromise: ReturnType<typeof consultaCreditosServidor>
}

export function Table({ creditosFolgasPromise }: TableProps) {
  const { content, totalPages, totalElements } = React.use(
    creditosFolgasPromise,
  )

  const columns = React.useMemo(() => getColumns(), [])
  const filterFields: DataTableFilterField<CreditoDTO>[] = []
  const { table } = useDataTable({
    data: content,
    columns,
    pageCount: totalPages,
    rowCount: totalElements,

    filterFields,
    defaultSize: 25,
  })

  return (
    <>
      <SolicitacaoFolgaDialog table={table} data={content} />
      <DataTable table={table} filterFields={filterFields}></DataTable>
    </>
  )
}
