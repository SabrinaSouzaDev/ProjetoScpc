import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { financialFormSchema } from './FinancialFormSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateFinancialRequest } from '@/app/services/financialService'
import { ErrorMapping } from '@/utils/errorMapping'
import { useToast } from '@/components/ui/use-toast'
import { objectToFormData } from '@/utils/objectToFormData'
import React from 'react'
import FormFields from './FormFields'
import ConfirmFormFields from './ConfirmFormFields'

interface PecuniaFormProps {
  pecuniaId: number
}

export default function PecuniaForm({ pecuniaId }: PecuniaFormProps) {
  const [lastPage, setLastPage] = React.useState<boolean>(false)
  const form = useForm<z.infer<typeof financialFormSchema>>({
    resolver: zodResolver(financialFormSchema),
  })
  const { toast } = useToast()

  async function handleSubmitData(values: z.infer<typeof financialFormSchema>) {
    let erroTreatment
    try {
      const response = await updateFinancialRequest(
        objectToFormData({
          ...values,
          id: pecuniaId,
        }),
      )

      if (response !== 'SUCCESS_UPDATE') {
        erroTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      toast({
        title: 'Dados financeiro atualizados com sucesso',
        duration: 3000,
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: erroTreatment || 'Erro ao realizar solicitação',
        duration: 4000,
      })
    }
  }

  function setNextPage() {
    setLastPage(!lastPage)
  }

  return (
    <Form {...form}>
      {lastPage ? (
        <ConfirmFormFields
          form={form}
          handleSubmit={handleSubmitData}
          handleReturn={setNextPage}
        />
      ) : (
        <FormFields form={form} handleSubmit={setNextPage} />
      )}
    </Form>
  )
}
