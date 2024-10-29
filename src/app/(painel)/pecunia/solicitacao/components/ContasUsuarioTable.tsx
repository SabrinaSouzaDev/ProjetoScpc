/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import {
  consultaContaServidor,
  UserConta,
} from '@/app/services/server/ServidorConta'
import { useToast } from '@/components/ui/use-toast'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import React from 'react'
import { getColumns } from './ContaDataTableColumns'
import { DataList } from '@/components/ui/data-table/data-list-custume'
// import { Button } from '@/components/ui/button'

type TableProps = {
  id: number
  onSelectConta: (selectedConta: UserConta | undefined) => void
}

export function ContasUsuarioTable({ id, onSelectConta }: TableProps) {
  // const [contaId, setContaId] = React.useState<string | undefined>(undefined)
  // const [agenciaId, setAgenciaId] = React.useState<string | undefined>(
  //   undefined,
  // )
  // const [bancoId, setBancoId] = React.useState<number | undefined>(undefined)
  const [content, setContent] = React.useState<UserConta[]>([])
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const { toast } = useToast()
  const columns = React.useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<UserConta>[] = []

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
      const data = await consultaContaServidor(id)
      setContent([data])
      setTotalPages(1)
      setTotalElements(1)
      // setContaId(data?.pessoa?.conta?.[0].contaId)
      // setAgenciaId(data?.pessoa?.conta?.[0].agenciaId)
      // setBancoId(data?.pessoa?.conta?.[0].bancoId)
    } catch (err) {
      console.error(err)
      toast({
        variant: 'destructive',
        description: 'Ocorreu um erro ao solicitar os dados da pecúnia',
        duration: 3000,
      })
    }
  }
  React.useEffect(() => {
    updateContentData()
  }, [id])
  React.useEffect(() => {
    const selectedRows = Object.keys(table.getState().rowSelection)
      .map((key) => content.find((row, index) => index === Number(key)))
      .filter((row): row is UserConta => row !== undefined)

    const selectedRow = selectedRows[0]
    onSelectConta(selectedRow)
  }, [table.getState().rowSelection, content])

  // console.log('Conta ID:', contaId)
  // console.log('Agência ID:', agenciaId)
  // console.log('Banco ID:', bancoId)

  return (
    <>
      <DataList table={table} filterFields={filterFields || ''} />
    </>
  )
}
