'use client'

import React, { Suspense } from 'react'
import { getColumns } from './DataTableColumns'
import { consultaCreditosServidor } from '@/app/services/server/ScpcServiceServer'
import { CreditoDTO } from '@/types/Credito'
import { DataTableFilterField } from '@/types'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useDataTable } from '@/hooks/useDataTable'
import { SolicitacaoFolgaDialog } from './SolicitacaoFolgaDialog'
import { TableWithoutData } from '@/components/TableWithoutData'
import { ErrorBoundary } from 'react-error-boundary'

type TableProps = {
  creditosFolgasPromise: ReturnType<typeof consultaCreditosServidor>
}

export function TableContent({ creditosFolgasPromise }: TableProps) {
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

      {content ? (
        <DataTable table={table} filterFields={filterFields} />
      ) : <h1 className="mt-4 text-lg text-center text-gray-500">
        Não há créditos aptos à folga no momento.
      </h1>}
    </>
  )
}

export default function Table({ creditosFolgasPromise }: TableProps) {
  return (
    <ErrorBoundary fallback={<TableWithoutData />}>
      <Suspense fallback={<p>⌛ Carregando dados da solicitação...</p>}>
        <TableContent creditosFolgasPromise={creditosFolgasPromise} />
      </Suspense>
    </ErrorBoundary>
  )
}