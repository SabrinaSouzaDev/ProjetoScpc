'use client'

import { DataTable } from '@/components/ui/data-table/data-table'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { PecuniaDTO } from '@/types/Pecunia'
import React from 'react'
import { getPecuniaInformations } from '@/app/services/pecuniaService'
import PecuniaDialog from '../../ChangePecuniaStatusDialog'
import { getColumns } from './DataTableColumns'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { TableWithouData } from '@/components/TableWithoutData'

type TableProps = {
  pecuniaPromise: ReturnType<typeof getPecuniaInformations>
}

export function Table({ pecuniaPromise }: TableProps) {
  const [content, setContent] = React.useState<PecuniaDTO[]>([])
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const columns = React.useMemo(() => getColumns(), [])

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
      return (
        <ErrorMessage
          title="Falha na requisição"
          message="Não foi possível conectar ao servidor."
        />
      )
    }
  }

  React.useEffect(() => {
    getTableInfos()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row flex-wrap gap-5">
          <PecuniaDialog action="DEFERIR" data={content} table={table} />
          <PecuniaDialog action="INDEFERIR" data={content} table={table} />
          <PecuniaDialog action="DEVOLVER" data={content} table={table} />
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
