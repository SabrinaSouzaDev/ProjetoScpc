'use client'
import React, { useEffect } from 'react'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { DataTable } from '@/components/ui/data-table/data-table'
import { Select } from '@/components/Select'
import { usePathname, useRouter } from 'next/navigation'
import { FilterOptions } from '@/app/(painel)/minhas-solicitacoes/components/filterOptions'
import { getPecuniaInformations } from '@/app/services/pecuniaService'
import { getPecuniaDataTableColumns } from './PecuniaDataTableColumns'
import { PecuniaDTO } from '@/types/Pecunia'
import { TableWithouData } from '@/components/TableWithoutData'

type TableProps = {
  solicitacaoPromise: ReturnType<typeof getPecuniaInformations>
}

export default function PecuniaTable({ solicitacaoPromise }: TableProps) {
  const { content, totalElements, totalPages } = React.use(solicitacaoPromise)
  const [filter, setFilter] = React.useState<string>('PECUNIA')
  const router = useRouter()
  const pathname = usePathname()
  const columns = React.useMemo(() => getPecuniaDataTableColumns(), [])

  const filterFields: DataTableFilterField<PecuniaDTO>[] = []

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
    router.push(`${pathname}?tipoSolicitacao=${filter}`)
  }, [filter])

  return (
    <>
      <div className="flex flex-wrap sm:gap-2 md:gap-5">
        <h1 className="text-[1rem] sm:text-[1.2rem] md:text-[1.4rem]">
          Filtro
        </h1>
        <Select
          title="Selecione entre folga e pecúnia"
          subtitle="Filtros"
          options={FilterOptions}
          handleClick={handleSetFilter}
          value={filter}
        />
      </div>

      {content ? (
        <DataTable table={table} filterFields={filterFields} />
      ) : (
        <TableWithouData />
      )}
    </>
  )
}
