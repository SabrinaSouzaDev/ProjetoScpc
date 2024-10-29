import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { nuplanFormSchema } from './NuplanFormSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMapping } from '@/utils/errorMapping'
import { useToast } from '@/components/ui/use-toast'
import {
  getNuplanData,
  updateNuplanInfosRequest,
} from '@/app/services/nuplanService'
import React, { useEffect } from 'react'
import { NuplanChildrensData } from '@/types/Nuplan'
import FormFields from './FormFields'
import ConfirmFormFields from './ConfirmFormFields'
import defaultReloadPage from '@/utils/reload'

interface PecuniaFormProps {
  pecuniaId: number
}

export async function handleSubmitData(
  values: z.infer<typeof nuplanFormSchema>,
  pecuniaId: number,
): Promise<'SUCCESS_UPDATE' | 'ERROR_UPDATE'> {
  let erroTreatment
  try {
    const response = await updateNuplanInfosRequest({
      ...values,
      idSolicitacaoPecunia: pecuniaId,
    })
    if (response !== 'SUCCESS_UPDATE') {
      erroTreatment = ErrorMapping(response.technicalMessage)
      throw new Error(`Erro na atualização: ${erroTreatment}`)
    }
    return 'SUCCESS_UPDATE'
  } catch (err) {
    return 'ERROR_UPDATE'
  }
}

export default function NuplanForm({ pecuniaId }: PecuniaFormProps) {
  const [lastPage, setLastPage] = React.useState<boolean>(false)
  const [detalhamentoFonte, setDetalhamentoFonte] =
    React.useState<NuplanChildrensData[]>()
  const [convenio, setConvenio] = React.useState<NuplanChildrensData[]>()
  const [funcaoProgramatica, setFuncaoProgramatica] =
    React.useState<NuplanChildrensData[]>()
  const [gppara, setGppara] = React.useState<NuplanChildrensData[]>()
  const [naturezaDespesa, setNaturezaDespesa] =
    React.useState<NuplanChildrensData[]>()
  const [planoInterno, setPlanoInterno] =
    React.useState<NuplanChildrensData[]>()
  const form = useForm<z.infer<typeof nuplanFormSchema>>({
    resolver: zodResolver(nuplanFormSchema),
    mode: 'onChange',
  })
  const { toast } = useToast()

  async function handleSubmitData(values: z.infer<typeof nuplanFormSchema>) {
    let erroTreatment
    try {
      const response = await updateNuplanInfosRequest({
        ...values,
        idSolicitacaoPecunia: pecuniaId,
      })
      defaultReloadPage()

      if (response !== 'SUCCESS_UPDATE') {
        erroTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      toast({
        title: 'Dados nuplan atualizados com sucesso',
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

  function handleSelectChange(name: string, selectedValue: number) {
    form.setValue(name as keyof z.infer<typeof nuplanFormSchema>, selectedValue)
    form.trigger(name as keyof z.infer<typeof nuplanFormSchema>)
  }

  function setNextPage() {
    setLastPage(!lastPage)
  }

  async function handleGetNuplanData() {
    try {
      const response = await getNuplanData()
      setDetalhamentoFonte(response.detalhamentoFonte)
      setFuncaoProgramatica(response.funcaoProgramatica)
      setGppara(response.gppara)
      setNaturezaDespesa(response.naturezaDespesa)
      setPlanoInterno(response.planoInterno)
      setConvenio(response.convenio)
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Erro ao realizar solicitação',
        duration: 4000,
      })
    }
  }
  // const onSubmit: SubmitHandler<z.infer<typeof nuplanFormSchema>> = async (
  //   values,
  // ) => {
  //   await handleSubmitData(values, pecuniaId)
  // }

  useEffect(() => {
    handleGetNuplanData()
  }, [])

  return (
    <Form {...form}>
      {lastPage ? (
        <ConfirmFormFields
          form={form}
          handleSubmit={handleSubmitData}
          convenio={convenio}
          detalhamentoFonte={detalhamentoFonte}
          funcaoProgramatica={funcaoProgramatica}
          gppara={gppara}
          naturezaDespesa={naturezaDespesa}
          planoInterno={planoInterno}
          handleReturn={setNextPage}
        />
      ) : (
        <FormFields
          convenio={convenio}
          detalhamentoFonte={detalhamentoFonte}
          funcaoProgramatica={funcaoProgramatica}
          gppara={gppara}
          naturezaDespesa={naturezaDespesa}
          planoInterno={planoInterno}
          handleSelectChange={handleSelectChange}
          form={form}
          handleSubmit={setNextPage}
        />
      )}
    </Form>
  )
}
