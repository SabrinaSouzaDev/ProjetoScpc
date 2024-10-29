'use client'

// import { postFinancialAnnex } from '@/app/services/financialService'
import { TableWithouData } from '@/components/TableWithoutData'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useToast } from '@/components/ui/use-toast'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
// import { ErrorMapping } from '@/utils/errorMapping'
// import { objectToFormData } from '@/utils/objectToFormData'
import React from 'react'
import { getColumnsEscala } from './DataTableColumns'
// import EscalaDialogDialog from './ListaDialog/EscalaDialogDialog'
import { consultaEditarSolicitacaoEscalaPlantao } from '@/app/services/server/EscalaPlantaoEditGet'
import { EscalaGetResponse } from './TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'

type TableProps = {
  EscalaEditPromise: ReturnType<typeof consultaEditarSolicitacaoEscalaPlantao>
}

export function Table({ EscalaEditPromise }: TableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [content, setContent] = React.useState<EscalaGetResponse[]>([])
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const { toast } = useToast()
  const columns = React.useMemo(() => getColumnsEscala(), [])
  // const [annexFile, setAnnexFile] = React.useState<File | null>(null)
  const filterFields: DataTableFilterField<EscalaGetResponse>[] = []
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
      EscalaEditPromise.then((data) => {
        setContent(data.content)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
      })
    } catch (error) {
      console.error('Erro ao buscar diretorias:', error)
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
      {/* <EscalaDialogDialog
        data={content}
        table={table}
        handleFileChange={handleFileChange}
        annexFile={annexFile}
        confirmRequest={handlePostAnnex}
        isDisabled={
          Object.keys(table.getState().rowSelection).length === 0 || // Desabilitar se nenhuma linha estiver selecionada
          Object.keys(table.getState().rowSelection).some((key) => {
            const selectedRow = content[parseInt(key)]
            return (
              !selectedRow.escalaPlantaoDia?.[0].id ||
              !selectedRow.escalaPlantaoDia[0].servidorId ||
              !selectedRow.escalaPlantaoDia[0].relatorioDescricao
            )
          })
        }
      /> */}

      {content ? (
        <DataTable table={table} filterFields={filterFields} />
      ) : (
        <TableWithouData />
      )}
    </>
  )
}
