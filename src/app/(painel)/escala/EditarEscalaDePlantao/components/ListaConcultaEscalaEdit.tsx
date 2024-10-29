import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import React from 'react'

import { DataList } from '@/components/ui/data-table/data-list-custume'
import { getColumnsListEscalaEdit } from './ListEscalaColumns '
import { EscalaPlantao } from './TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'

type ListaConsultaProps = {
  selectedRows: EscalaPlantao[]
}

export function ListaConcultaEscalaEdit({ selectedRows }: ListaConsultaProps) {
  const columns = React.useMemo(() => getColumnsListEscalaEdit(), [])
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
