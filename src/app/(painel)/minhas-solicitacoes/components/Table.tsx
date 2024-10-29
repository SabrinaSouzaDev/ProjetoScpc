'use client'
import React, { useEffect } from 'react'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { getColumns } from './DataTableColumns'
import SolicitacaoStatusDialog from './SolicitacaoStatusDialog'
import { DataTable } from '@/components/ui/data-table/data-table'
import { Select } from '@/components/Select'
import { FilterOptions } from './filterOptions'
import { getRequestsInfos } from '@/app/services/statusService'
import { SolicitacaoDTO } from '@/types/Solicitacao'
import { usePathname, useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { updatePecuniaRequest } from '@/app/services/pecuniaService'
import { ErrorMapping } from '@/utils/errorMapping'
import { updateFolgaRequest } from '@/app/services/folgaService'

type TableProps = {
  solicitacaoPromise: ReturnType<typeof getRequestsInfos>
}

export default function Table({ solicitacaoPromise }: TableProps) {
  const { content, totalElements, totalPages } = React.use(solicitacaoPromise)
  const { toast } = useToast()
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

  async function handleUpdatePecunia(id: number) {
    let errorTreatment
    try {
      const response = await updatePecuniaRequest({
        id,
        status: 'CANCELADO',
      })

      if (response !== 'SUCCESS_UPDATE') {
        errorTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      toast({
        title: 'Solicitação atualizada com sucesso',
        duration: 3000,
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: errorTreatment || 'Erro ao realizar solicitação',
        duration: 4000,
      })
    }
  }

  async function handleUpdateFolga(id: number) {
    let errorTreatment
    try {
      const response = await updateFolgaRequest({
        id,
        status: 'CANCELADO',
      })

      if (response !== 'SUCCESS_UPDATE') {
        errorTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      toast({
        title: 'Solicitação de folga cancelada com sucesso',
        duration: 3000,
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: errorTreatment || 'Erro ao realizar solicitação',
        duration: 4000,
      })
    }
  }

  async function handleConfirmRequest(selectedRows: SolicitacaoDTO[]) {
    const isMultipleRows: boolean = selectedRows?.length > 1
    const selectedRow = selectedRows[0]
    const filterValue = filter === 'PECUNIA'

    if (isMultipleRows) {
      const rowsData = selectedRows.reduce(
        (
          accumulator: {
            pecuniaId: number
          }[],
          item: SolicitacaoDTO,
        ) => {
          if (item.creditos && item.creditos[0]?.id !== undefined) {
            accumulator.push({
              pecuniaId: item.creditos[0]?.id,
            })
          }
          return accumulator
        },
        [],
      )

      for (const row of rowsData) {
        const { pecuniaId: selectedRowPecuniaId } = row

        filterValue
          ? handleUpdatePecunia(selectedRowPecuniaId)
          : handleUpdateFolga(selectedRowPecuniaId)
      }

      return
    }
    const pecuniaId = selectedRow.creditos[1].id

    filterValue ? handleUpdatePecunia(pecuniaId) : handleUpdateFolga(pecuniaId)
  }

  useEffect(() => {
    router.push(`${pathname}?tipoFuncionario=${filter}`)
  }, [filter])

  return (
    <>
      <div className="flex flex-wrap sm:gap-2 md:gap-5">
        <SolicitacaoStatusDialog
          table={table}
          data={content}
          confirmRequest={handleConfirmRequest}
        />

        <Select
          title="Selecione entre folga e pecúnia"
          subtitle="Filtros"
          options={FilterOptions}
          handleClick={handleSetFilter}
          value={filter}
        />
      </div>

      <DataTable table={table} filterFields={filterFields} />
    </>
  )
}
