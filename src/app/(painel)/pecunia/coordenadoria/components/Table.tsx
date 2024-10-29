'use client'

import { getPecuniaInformations } from '@/app/services/pecuniaService'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useToast } from '@/components/ui/use-toast'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { PecuniaDTO } from '@/types/Pecunia'
import React from 'react'
import { getColumns } from './DataTableColumns'
import { TableWithouData } from '@/components/TableWithoutData'
import PecuniaDialog from '../../ChangePecuniaStatusDialog'

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

  async function getTableInfos() {
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
    getTableInfos()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row flex-wrap gap-5">
          <PecuniaDialog
            isAprove={true}
            data={content}
            table={table}
            action="DEFERIR"
          />

          <PecuniaDialog
            isAprove={false}
            data={content}
            table={table}
            action="INDEFERIR"
          />
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
