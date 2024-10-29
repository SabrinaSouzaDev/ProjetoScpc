'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { CreditoSolicitacaoDTO } from '@/types/Credito'

type FormValues = {
  dob: Date[]
}

const FormSchema = z.object({
  dob: z.array(
    z.date({
      required_error: 'É necessário selecionar uma data.',
    }),
  ),
})

type FormControl = { selectedRowsmodel: CreditoSolicitacaoDTO[] }

export function CalendarForm({ selectedRowsmodel }: FormControl) {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function handleSubmit() {
    router.back()
    toast({
      description: 'Certificado adicionado com sucesso',
    })
  }

  let qtdFolgas = selectedRowsmodel

  if (qtdFolgas.length > 5) {
    qtdFolgas = selectedRowsmodel.slice(0, 5)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {qtdFolgas.map((row) => (
          <FormField
            key={row.id}
            control={form.control}
            name={`dob.${row.id}` as keyof FormValues}
            render={({ field }) => (
              <FormItem className="min-[320px]:col-8 col-12 grid">
                <FormLabel className="w-96">Dias de folga</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'min-[300px]:w-1/2 sm:w-full md:w-full lg:w-full max-[1700px]:w-full pl-3 text-left font-normal',
                          !field.value && 'texto silenciado em primeiro plano',
                        )}
                      >
                        {field.value instanceof Date ? (
                          format(field.value, 'dd/MM/yyyy', {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Escolha uma data</span>
                        )}

                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        Array.isArray(field.value)
                          ? field.value[0]
                          : field.value
                      }
                      onSelect={field.onChange}
                      // disabled={(date) =>
                      //   date > new Date() || date < new Date('01-01-1900')
                      // }
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="w-86 flex flex-col gap-3">
                  {`Id da solicitação ${row.id}`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
