'use client'
import { getScaleInfosByDayAndSever } from '@/app/services/scaleService'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { ScaleInfos } from '@/types/Scale'
import React from 'react'
import { getColumns } from './DataTableColumns'
import { DataTable } from '@/components/ui/data-table/data-table'

interface TableProps {
  registerScaleReport: ReturnType<typeof getScaleInfosByDayAndSever>
}

export function Table({ registerScaleReport }: TableProps) {
  const { content, totalElements, totalPages } = React.use(registerScaleReport)
  const columns = React.useMemo(() => getColumns(), [])
  const filterFields: DataTableFilterField<ScaleInfos>[] = []

  const { table } = useDataTable({
    data: content,
    columns,
    pageCount: totalPages,
    rowCount: totalElements,
    filterFields,
    defaultSize: 25,
  })
  return (
    <div>
      <DataTable table={table} filterFields={filterFields || ''} />
    </div>
  )
}
