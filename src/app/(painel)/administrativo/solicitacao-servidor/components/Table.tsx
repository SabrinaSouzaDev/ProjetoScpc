'use client'
import React, { useEffect } from 'react'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { DataTable } from '@/components/ui/data-table/data-table'
import { Select } from '@/components/Select'
import { getRequestsInfos } from '@/app/services/statusService'
import { SolicitacaoDTO } from '@/types/Solicitacao'
import { usePathname, useRouter } from 'next/navigation'
import { FilterOptions } from '@/app/(painel)/minhas-solicitacoes/components/filterOptions'
import { getColumns } from './DataTableColumns'

type TableProps = {
  solicitacaoPromise: ReturnType<typeof getRequestsInfos>
}

export default function Table({ solicitacaoPromise }: TableProps) {
  const { content, totalElements, totalPages } = React.use(solicitacaoPromise)
  const [filter, setFilter] = React.useState<string>('PECUNIA')
  const router = useRouter()
  const pathname = usePathname()
  const columns = React.useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<SolicitacaoDTO>[] = []

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
    router.push(`${pathname}?tipoFuncionario=${filter}`)
  }, [filter])

  return (
    <>
      <div className="flex flex-wrap items-center sm:gap-2 md:gap-5">
        <h1 className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem]">
          Filtro:{' '}
        </h1>
        <Select
          title="Selecione entre folga e pecúnia"
          subtitle="Filtros"
          options={FilterOptions}
          handleClick={handleSetFilter}
          value={filter}
        />
      </div>

      <DataTable table={table} filterFields={filterFields || ''} />
    </>
  )
}
