import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import React from 'react'

import { DataList } from '@/components/ui/data-table/data-list-custume'
import { EscalaPlantao } from '../type/AprovarEscalaPlatao'
import { getColumnsListEscala } from './ListEscalaColumns '

type ListaConsultaProps = {
  selectedRows: EscalaPlantao[]
}

export function ListaConsultaCreditoUser({ selectedRows }: ListaConsultaProps) {
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
