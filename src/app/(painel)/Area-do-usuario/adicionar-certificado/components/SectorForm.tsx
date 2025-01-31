'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
// import { routes } from '@/constants/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FloppyDisk } from '@phosphor-icons/react/dist/ssr'

const formSchema = z.object({
  titulocertificado: z
    .string()
    .max(30, { message: 'O Titulo deve conter no maximo 30 caracteres' })
    .min(4, { message: 'O Titulo deve conter pelo menos 4 caracteres' })
    .refine((value) => value !== '', { message: 'O Titulo é obrigatório' }),
  cargahoraria: z
    .number()
    .positive({ message: 'A carga horária deve ser um número positivo' })
    .refine((value) => value >= 1, {
      message: 'A carga horária é obrigatória',
    }),
})

export function SectorForm() {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulocertificado: '',
      cargahoraria: 0,
    },
  })

  function handleSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    router.back()
    toast({
      description: 'Certificado adicionado com sucesso',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="w-full p-4 shadow-xl">
          <CardHeader
            className="pb-4
          "
          >
            <CardTitle>Adicionar Certificado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="titulocertificado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titulo do Certificado</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="cargahoraria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carga horaria</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={Number(field.value)}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormItem>
                <FormLabel>Adicionar arquivo PDF</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary dark:text-gray-200 sm:text-sm"
                    onChange={(e) => {
                      if (e.target.files) {
                        console.log('Arquivo selecionado:', e.target.files[0])
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-end gap-3">
            <Button className="dark:text-white">
              <FloppyDisk size={22} className="mr-2" /> Salvar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
