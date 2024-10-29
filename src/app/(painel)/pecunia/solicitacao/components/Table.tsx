'use client'

import { postPecuniaRequest } from '@/app/services/pecuniaService'
import { consultaCreditosServidor } from '@/app/services/server/ScpcServiceServer'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useToast } from '@/components/ui/use-toast'
import { useDataTable } from '@/hooks/useDataTable'
import { DataTableFilterField } from '@/types'
import { CreditoDTO } from '@/types/Credito'
import { ErrorMapping } from '@/utils/errorMapping'
import React from 'react'
import { getColumns } from './DataTableColumns'
import SolicitarPecuniaDialog from './SolicitarPecuniaDialog'
import { PostPecuniaParams } from '@/types/Pecunia'
import defaultReloadPage from '@/utils/reload'
import { UserConta } from '@/app/services/server/ServidorConta'

type TableProps = {
  pecuniaPromise: ReturnType<typeof consultaCreditosServidor>
  diretoriaId: number | undefined
  gerenciaId: number | undefined
  nucleoId: number | undefined
  ServidorId: number
  selectedConta?: UserConta
}

export function Table({
  pecuniaPromise,
  diretoriaId,
  gerenciaId,
  nucleoId,
  ServidorId,
  selectedConta,
  // contaPromise,
}: TableProps) {
  const [content, setContent] = React.useState<CreditoDTO[]>([])
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const { toast } = useToast()
  const columns = React.useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<CreditoDTO>[] = []

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

  async function handlePostPecuniaRequest(
    params: PostPecuniaParams,
  ): Promise<boolean> {
    let errorTreatment
    try {
      const response = await postPecuniaRequest(params)
      if (response !== 'SUCCESS_SAVE') {
        errorTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }
      toast({
        title: 'Pecúnia Solicitada com sucesso',
        duration: 3000,
      })
      return true
    } catch (err) {
      toast({
        variant: 'destructive',
        title: errorTreatment || 'Erro ao realizar solicitação',
        duration: 4000,
      })
      return false
    }
  }

  async function handleConfirmRequest(
    selectedRows: CreditoDTO[],
    selectedConta: UserConta[],
  ) {
    const isMultipleRows: boolean = selectedRows.length > 1
    const selectedRow = selectedRows[0]
    const selectedRowsConta = selectedConta[0]
    const conta = {
      contaId: selectedRowsConta.pessoa?.conta?.[0]?.contaId,
      agenciaId: selectedRowsConta.pessoa?.conta?.[0]?.agenciaId,
      bancoId: selectedRowsConta.pessoa?.conta?.[0]?.bancoId,
    }

    if (isMultipleRows) {
      let promiseResponse

      const rowsId = selectedRows.reduce(
        (accumulator: { creditoId: number }[], item: CreditoDTO) => {
          if (item) {
            accumulator.push({ creditoId: item.id })
          }
          return accumulator
        },
        [],
      )

      for (const row of rowsId) {
        const { creditoId: selectedRowCreditoId } = row

        if (conta) {
          const params: PostPecuniaParams = {
            creditoId: selectedRowCreditoId,
            situacao: 'GERENCIA',
            status: 'SOLICITADO',
            diretoriaId: diretoriaId || undefined,
            gerenciaId: gerenciaId || undefined,
            nucleoId: nucleoId || undefined,
            valorTotal: 0,
            valorUnitario: 0,
            contaId: conta.contaId || '',
            agenciaId: conta.agenciaId || '',
            bancoId: conta.bancoId || 0,
          }

          // Envia a requisição POST
          promiseResponse = await handlePostPecuniaRequest(params)
        } else {
          console.error('Conta não disponível para o usuário.')
          toast({
            variant: 'destructive',
            title: 'Conta não disponível para o usuário.',
            duration: 4000,
          })
        }
      }

      return promiseResponse ? defaultReloadPage() : null
    }

    const creditId = selectedRow.id
    // const idconta = selectedRowsConta.id
    // const { contaId, agenciaId, bancoId } = selectedRowsConta.pessoa?.conta?.[0] || {}

    if (conta) {
      // const { contaId, agenciaId, bancoId } = conta
      const response = await handlePostPecuniaRequest({
        creditoId: creditId,
        situacao: 'GERENCIA',
        status: 'SOLICITADO',
        diretoriaId: diretoriaId || undefined,
        gerenciaId: gerenciaId || undefined,
        nucleoId: nucleoId || undefined,
        valorTotal: 0,
        valorUnitario: 0,
        contaId: conta.contaId || '',
        agenciaId: conta.agenciaId || '',
        bancoId: conta.bancoId || 0,
      })

      if (response) {
        defaultReloadPage()
      }
    } else {
      console.error('Conta não disponível para o usuário.')
      toast({
        variant: 'destructive',
        title: 'Conta não disponível para o usuário.',
        duration: 4000,
      })
    }
  }

  React.useEffect(() => {
    updateContentData()
  }, [])

  return (
    <>
      <SolicitarPecuniaDialog
        ServidorId={ServidorId}
        table={table}
        data={content}
        confirmRequest={handleConfirmRequest}
        contaId={selectedConta?.pessoa?.conta?.[0]?.contaId}
        agenciaId={selectedConta?.pessoa?.conta?.[0]?.agenciaId}
        bancoId={selectedConta?.pessoa?.conta?.[0]?.bancoId}
      />
      <DataTable table={table} filterFields={filterFields || ''} />
    </>
  )
}
