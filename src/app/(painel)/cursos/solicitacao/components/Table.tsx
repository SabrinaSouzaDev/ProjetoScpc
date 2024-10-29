'use client'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import React from 'react'
import { getColumns } from './DataTableColumns'
import { TableWithouData } from '@/components/TableWithoutData'
import { getCourses } from '@/app/services/courseService'
import { CourseContentDTO } from '@/types/Course'
import { CourseDialog } from './CourseDialog'
import { usePathname, useRouter } from 'next/navigation'
import { Select } from '@/components/Select'
import { FilterOptions } from './FilterOptions'

type TableProps = {
  requestPromise: ReturnType<typeof getCourses>
}

export function Table({ requestPromise }: TableProps) {
  const { content, totalElements, totalPages } = React.use(requestPromise)
  const [filter, setFilter] = React.useState<string>('')
  const columns = React.useMemo(() => getColumns(), [])
  const pathname = usePathname()
  const router = useRouter()

  const filterFields: DataTableFilterField<CourseContentDTO>[] = []

  const { table } = useDataTable({
    data: content,
    columns,
    pageCount: totalPages,
    rowCount: totalElements,
    filterFields,
    defaultSize: 25,
  })

  const handleSetFilter = (value: string) => {
    setFilter(value)
  }

  React.useEffect(() => {
    router.push(`${pathname}?situacao=${filter}`)
  }, [filter])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap justify-between gap-6 md:gap-0">
        <div className="flex gap-8">
          <CourseDialog isAprove data={content} table={table} />
          <CourseDialog isAprove={false} data={content} table={table} />
        </div>

        <Select
          title="Selecione o status"
          subtitle="Filtros"
          options={FilterOptions}
          handleClick={handleSetFilter}
          value={filter}
        />
      </div>

      {content?.length ? (
        <DataTable table={table} filterFields={filterFields} />
      ) : (
        <TableWithouData />
      )}
    </div>
  )
}
