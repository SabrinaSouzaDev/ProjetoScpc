import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { CreditoPlantaoDTO } from '@/types/Credito'
import React from 'react'
import { getColumnsDemostrativo } from './ColumConsultaCredito'
import { DataList } from '@/components/ui/data-table/data-list-custume'

type ListaConsultaProps = {
  selectedRows: CreditoPlantaoDTO[]
}

export function ListaConsultaCreditoUser({ selectedRows }: ListaConsultaProps) {
  const columns = React.useMemo(() => getColumnsDemostrativo(), [])
  const filterFields: DataTableFilterField<CreditoPlantaoDTO>[] = []

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
