'use client'
import { ErrorMessage } from '@/components/Shared/ErrorMsg'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import React from 'react'
import { getColumns } from './DataTableColumns'
import { TableWithouData } from '@/components/TableWithoutData'
import { getCourses } from '@/app/services/courseService'
import { CourseContentDTO } from '@/types/Course'

type TableProps = {
  requestPromise: ReturnType<typeof getCourses>
}

export function Table({ requestPromise }: TableProps) {
  const [content, setContent] = React.useState<CourseContentDTO[]>([])
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const columns = React.useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<CourseContentDTO>[] = []

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
      requestPromise.then((data) => {
        setContent(data.content)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
      })
    } catch (error) {
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
    <div className="flex flex-col gap-5">
      {content?.length ? (
        <DataTable table={table} filterFields={filterFields} />
      ) : (
        <TableWithouData />
      )}
    </div>
  )
}
