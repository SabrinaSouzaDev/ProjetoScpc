import { DataList } from '@/components/ui/data-table/data-list-custume'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import React from 'react'
import { getColumnsListEscala } from './ListEscalaColumns '
import { EscalaPlantao } from '../TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'

type ListaConsultaProps = {
  selectedRows: EscalaPlantao[]
}

export function ListaEscalaEdit({ selectedRows }: ListaConsultaProps) {
  const columns = React.useMemo(() => getColumnsListEscala(), [])
  const filterFields: DataTableFilterField<EscalaPlantao>[] = []

  const { table } = useDataTable({
    data: selectedRows,
    columns,
    pageCount: 1,
    rowCount: selectedRows.length,
    filterFields,
    defaultSize: 25,
  })

  return <DataList table={table} filterFields={filterFields || ''} />
}
