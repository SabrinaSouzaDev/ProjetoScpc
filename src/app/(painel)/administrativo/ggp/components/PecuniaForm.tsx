import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { pecuniaFormSchema } from './PecuniaFormSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { updateFinancialRequest } from '@/app/services/financialService'
import { ErrorMapping } from '@/utils/errorMapping'
import { useToast } from '@/components/ui/use-toast'
import { objectToFormData } from '@/utils/objectToFormData'

interface PecuniaFormProps {
  pecuniaId: number
}

export default function PecuniaForm({ pecuniaId }: PecuniaFormProps) {
  const form = useForm<z.infer<typeof pecuniaFormSchema>>({
    resolver: zodResolver(pecuniaFormSchema),
  })
  const { toast } = useToast()

  async function handleSubmitData(values: z.infer<typeof pecuniaFormSchema>) {
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitData)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="numeroEmpenho"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Empenho</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o valor de empenho"
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ordem Bancária</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o valor de OB"
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="liquidacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Liquidação</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o valor de Liquidação"
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ''
                        ? undefined
                        : Number(e.target.value),
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="anexoFinanceiro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anexo Financeiro</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    field.onChange(file)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Confirmar Solicitação</Button>
      </form>
    </Form>
  )
}
