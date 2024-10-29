'use client'

import React from 'react'
import { getColumns } from './DataTableColumns'
import { getPecuniaInformations } from '@/app/services/pecuniaService'
import { DataTableFilterField } from '@/types'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useDataTable } from '@/hooks/useDataTable'
import { PecuniaDTO } from '@/types/Pecunia'
import { useToast } from '@/components/ui/use-toast'

type TableProps = {
  pecuniaPromise: ReturnType<typeof getPecuniaInformations>
}

export function Table({ pecuniaPromise }: TableProps) {
  const [content, setContent] = React.useState<PecuniaDTO[]>([])
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const { toast } = useToast()
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

  async function updateContentData() {
    try {
      pecuniaPromise.then((data) => {
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
    updateContentData()
  }, [])

  return <DataTable table={table} filterFields={filterFields} />
}
