import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { CreditoDTO } from '@/types/Credito'
import React from 'react'
import { getColumnsDemostrativo } from './ColumDemostrativo'
import { DataList } from '@/components/ui/data-table/data-list-custume'

type ConfirmarProps = {
  selectedRows: CreditoDTO[]
}

export function DemostrativoDeDados({ selectedRows }: ConfirmarProps) {
  const columns = React.useMemo(() => getColumnsDemostrativo(), [])
  const filterFields: DataTableFilterField<CreditoDTO>[] = []

  const { table } = useDataTable({
    data: selectedRows,
    columns,
    pageCount: 1,
    rowCount: selectedRows.length,
    filterFields,
    defaultSize: 25,
  })

  return (
    <>
      <DataList table={table} filterFields={filterFields || ''} />
    </>
  )
}
