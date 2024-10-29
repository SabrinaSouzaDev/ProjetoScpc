'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
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
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { solicitarFolga } from '@/app/services/client/ScpcServiceClient'
import { CreditoDTO } from '@/types/Credito'
import { ErrorMapping } from '@/utils/errorMapping'
import { formatDateInvert } from '@/utils/formatDate'
import { DialogClose } from '@/components/ui/dialog'
import defaultReloadPage from '@/utils/reload'

const FormSchema = z.object({
  creditoId: z.number(),
  creditoMeio: z.number().optional(),
  dataFolga: z
    .date()
    .transform((date): string => dayjs(date).format('DD/MM/YYYY')),
  diretoriaId: z.number(),
  gerenciaId: z.number().optional(),
  nucleoId: z.number().optional(),
})

type FormControl = { selectedRows: CreditoDTO[] }

export function SolicitacaoFolgaForm({ selectedRows }: FormControl) {
  const session = useSession()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  form.setValue('creditoId', selectedRows[0].id!)
  if (selectedRows.length > 1) {
    form.setValue('creditoMeio', selectedRows[1].id!)
  }
  form.setValue('diretoriaId', session.data?.user?.diretoriaId ?? 1)
  if (session.data?.user?.gerenciaId)
    form.setValue('gerenciaId', session.data?.user?.gerenciaId)
  if (session.data?.user?.nucleoId)
    form.setValue('nucleoId', session.data?.user?.nucleoId)

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    let threatmentMessage
    try {
      const response = await solicitarFolga({
        ...data,
        dataFolga: formatDateInvert(data.dataFolga),
      })

      if (response !== 'SUCCESS_SAVE') {
        threatmentMessage = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      toast({
        title: 'Folga Solicitada com sucesso',
        duration: 3000,
      })

      defaultReloadPage()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: threatmentMessage || 'Ocorreu um erro na solicitação',
        duration: 5000,
      })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {
          <FormField
            control={form.control}
            name={`dataFolga`}
            render={({ field }) => (
              <FormItem className="min-[320px]:col-8 col-12 grid">
                <FormLabel className="w-96">Dia de folga</FormLabel>
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
                        {field.value !== undefined ? (
                          dayjs(field.value).format('DD/MM/YYYY')
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
                      onSelect={field.onChange}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        }
        <DialogClose asChild>
          <Button type="submit">Enviar</Button>
        </DialogClose>
      </form>
    </Form>
  )
}
