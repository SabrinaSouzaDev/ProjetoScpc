'use client'

import React from 'react'
import { getColumns } from './DataTableColumns'
import { solicitarFolgaSubDefensoria } from '@/app/services/server/ScpcServiceServer'
import { DataTable } from '@/components/ui/data-table/data-table'
import { toast } from '@/components/ui/use-toast'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { SolicitacaoFolgaDialog } from './FolgaDialog'
import { SolicitacaoCreditoDTO } from '@/types/Credito'
import { CienciaFolgaAtualizacao } from '@/app/services/client/ScpcServiceClient'
import { TableWithouData } from '@/components/TableWithoutData'

type TableProps = {
  creditosPromise: ReturnType<typeof solicitarFolgaSubDefensoria>
}

export function Table({ creditosPromise }: TableProps) {
  const { content, totalPages, totalElements } = React.use(creditosPromise)
  const columns = React.useMemo(() => getColumns(), [])
  const filterFields: DataTableFilterField<SolicitacaoCreditoDTO>[] = []
  const { table } = useDataTable({
    data: content,
    columns,
    pageCount: totalPages,
    rowCount: totalElements,
    filterFields,
    defaultSize: 25,
  })

  function handleAprovarFolga(data: SolicitacaoCreditoDTO[]) {
    const dataToUpdate = data.map((dado) => dado.id)

    CienciaFolgaAtualizacao(dataToUpdate)
      .then((message: string) => {
        toast({
          description: (
            <pre>
              <code>{message}</code>
            </pre>
          ),
          duration: 3000,
        })
      })
      .catch((error: unknown) => {
        let errorMessage = 'Ocorreu um erro na solicitação'

        if (error instanceof Error) {
          errorMessage = error.message
        }

        toast({
          variant: 'destructive',
          description: errorMessage,
          duration: 5000,
        })
      })
  }

  return (
    <>
      <SolicitacaoFolgaDialog
        table={table}
        data={content}
        onAprovarFolga={handleAprovarFolga}
      />

      {content?.length ? (
        <DataTable table={table} filterFields={filterFields || ''} />
      ) : (
        <TableWithouData />
      )}
    </>
  )
}
