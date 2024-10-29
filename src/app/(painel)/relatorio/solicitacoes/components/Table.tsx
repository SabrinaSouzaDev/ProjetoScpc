'use client'
import { getScaleByDay } from '@/app/services/scaleService'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { ScaleInfos } from '@/types/Scale'
import React, { useEffect } from 'react'
import { DataTable } from '@/components/ui/data-table/data-table'
import { getColumns } from './DataTableColumns'
import { usePathname, useRouter } from 'next/navigation'
import { FilterOptions } from './filterOptions'
import { Select } from '@/components/Select'
import ReportDialog from './ChangeReportStatus'

interface TableProps {
  registerScaleReport: ReturnType<typeof getScaleByDay>
}

export function Table({ registerScaleReport }: TableProps) {
  const { content, totalElements, totalPages } = React.use(registerScaleReport)
  const [filter, setFilter] = React.useState<string>('SOLICITADO')
  const columns = React.useMemo(() => getColumns(), [])
  const filterFields: DataTableFilterField<ScaleInfos>[] = []
  const pathname = usePathname()
  const router = useRouter()

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

  useEffect(() => {
    router.push(`${pathname}?status=${filter}`)
  }, [filter])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-row flex-wrap gap-2">
          <ReportDialog
            action="DEFERIR"
            data={content}
            table={table}
            disable={filter === 'DEFERIDO' || filter === 'INDEFERIDO'}
          />
          <ReportDialog
            action="INDEFERIR"
            data={content}
            table={table}
            disable={filter === 'DEFERIDO' || filter === 'INDEFERIDO'}
          />
          <ReportDialog
            action="DEVOLVER"
            data={content}
            table={table}
            disable={filter === 'DEFERIDO' || filter === 'INDEFERIDO'}
          />
        </div>

        <Select
          title="Selecione entre folga e pecúnia"
          subtitle="Filtros"
          options={FilterOptions}
          handleClick={handleSetFilter}
          value={filter}
        />
      </div>

      <DataTable table={table} filterFields={filterFields || ''} />
    </div>
  )
}
