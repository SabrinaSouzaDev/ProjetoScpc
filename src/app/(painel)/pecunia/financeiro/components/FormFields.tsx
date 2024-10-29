import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { financialFormSchema } from './FinancialFormSchema'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

type FormFieldType = {
  form: UseFormReturn<z.infer<typeof financialFormSchema>>
  handleSubmit: () => void
}

export default function FormFields({ form, handleSubmit }: FormFieldType) {
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                    e.target.value === '' ? undefined : Number(e.target.value),
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
                    e.target.value === '' ? undefined : Number(e.target.value),
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
                    e.target.value === '' ? undefined : Number(e.target.value),
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end">
        <Button
          className="bg-green-600 text-white hover:bg-green-700"
          type="submit"
        >
          Atualizar informações
        </Button>
      </div>
    </form>
  )
}
