'use client'

import { consultaAprovarSolicitacaoEscala } from '@/app/services/server/EscalaPlantaoGet'
import { TableWithouData } from '@/components/TableWithoutData'
import { TitlePage } from '@/components/TitlePage'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useToast } from '@/components/ui/use-toast'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import React from 'react'
import { EscalaPlantao } from '../type/AprovarEscalaPlatao'
import PecuniaDialog from './ChangeEscalaStatusDialog'
import { getColumnsEscala } from './DataTableEscalaColumns'

type TableProps = {
  folgaPromise: ReturnType<typeof consultaAprovarSolicitacaoEscala>
}

export function Table({ folgaPromise }: TableProps) {
  const [content, setContent] = React.useState<EscalaPlantao[]>([])
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const { toast } = useToast()
  const columns = React.useMemo(() => getColumnsEscala(), [])

  const filterFields: DataTableFilterField<EscalaPlantao>[] = []

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
      folgaPromise.then((data) => {
        setContent(data.content)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        description: 'Ocorreu um erro ao solicitar os dados da pecúnia',
        duration: 3000,
      })
    }
  }

  React.useEffect(() => {
    getTableInfos()
  }, [])

  return (
    <div className="flex flex-col gap-7">
      <TitlePage title="Aprovação de Escala de Plantão" />
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
  )
}
