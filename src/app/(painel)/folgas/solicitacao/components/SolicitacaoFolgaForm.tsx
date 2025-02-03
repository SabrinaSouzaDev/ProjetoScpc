'use client'

import { solicitarFolga } from '@/app/services/client/ScpcServiceClient'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DialogClose } from '@/components/ui/dialog'
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
import { CreditoDTO } from '@/types/Credito'
import { ErrorMapping } from '@/utils/errorMapping'
import { formatDateInvert } from '@/utils/formatDate'
import { zodResolver } from '@hookform/resolvers/zod'
import { ptBR } from 'date-fns/locale'
import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  const router = useRouter()

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
    let threatmentMessage: string = ''
    try {
      const response = await solicitarFolga({
        ...data,
        dataFolga: formatDateInvert(data.dataFolga),
      })

      if (response !== 'SUCCESS_SAVE') {
        // Pode ser que o erro seja tratado como um objeto, então o parâmetro da função ErrorMapping precisa ser tratada corretamente
        threatmentMessage = ErrorMapping(ErrorMapping(response.toString()))
        throw new Error(`Response status: ${threatmentMessage}`)
      }

      toast({
        title: 'Folga Solicitada com sucesso',
        duration: 3000,
      })

      router.refresh()
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
                          'w-full pl-3 text-left font-normal',
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
                      locale={ptBR}
                      fromDate={new Date()}
                      disabled={(date) => {
                        const today = new Date();
                        const thirtyDaysLater = new Date(today);
                        thirtyDaysLater.setDate(today.getDate() + 30);
                        return date < thirtyDaysLater;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        }
        <DialogClose asChild>
          <Button
            className="min-w-36 bg-green-600 text-white hover:bg-green-700"
            type="submit"
          >
            Confirmar Solicitação
          </Button>
        </DialogClose>
      </form>
    </Form>
  )
}
