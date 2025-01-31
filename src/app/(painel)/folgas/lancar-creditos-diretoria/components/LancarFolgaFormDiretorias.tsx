'use client'
import {
  consultaCoordenadoriasByDiretoria,
  consultaGerenciasByCoordenadoria,
  consultaGerenciasByDiretoria,
  consultaServidoresByCoordenadoria,
  consultaServidoresByDiretoria,
  consultaServidoresByGerencia,
  salvarPlantao,
} from '@/app/services/client/ScpcServiceClient'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import {
  Coordenadoria,
  Diretoria,
  Gerencia,
} from '@/types/UnidadesAdministrativas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Plantao, Servidor } from '../type/plantaoDTO'

const formSchema = z.object({
  diretoria: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .nullable(),
  coordenadoria: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .nullable(),
  gerencia: z
    .object({
      id: z.number(),
      nome: z.string(),
    })
    .nullable(),
  servidor: z.object({
    id: z.number(),
    matricula: z.string(),
    pessoa: z.object({
      nomeCompleto: z.string(),
    }),
  }),
  saldo: z
    .number({
      required_error: 'Adicionar a quantidade de creditos',
      invalid_type_error: 'somente numeros',
    })
    .nonnegative({ message: 'Adicione um número válido' })
    .max(30, 'O plantão não pode ter um saldo maior que 30')
    .refine((value) => value !== undefined && value !== null, {
      message: 'É necessário preencher com a quantidade de crédito(s)',
    }),
  inicioPlantao: z
    .string()
    .refine((value) => value !== '', {
      message: 'É necessário selecionar uma data.',
    })
    .refine((value) => value !== undefined && value !== null, {
      message: 'É necessário preencher com a quantidade de crédito(s)',
    }),
  fimPlantao: z.string().refine((value) => value !== '', {
    message: 'É necessário selecionar uma data.',
  }),
  prescrito: z.boolean({
    required_error: 'test1.',
  }),
  converterPecunia: z.boolean({
    required_error: 'test2',
  }),
})

export function FolgasFormDiretorias({
  listaDiretorias,
}: Readonly<{
  listaDiretorias: Diretoria[]
}>) {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diretoria: undefined,
      coordenadoria: undefined,
      gerencia: undefined,
      servidor: undefined,
      saldo: undefined,
      inicioPlantao: '',
      fimPlantao: '',
      prescrito: false,
      converterPecunia: false,
    },
  })

  const [coordenadorias, setCoordenadorias] = useState<Coordenadoria[]>([])
  const [gerencias, setGerencias] = useState<Gerencia[]>([])
  const [servidores, setServidores] = useState<Servidor[]>([])

  async function getCoordenadorias(id: number) {
    const coordenadoriasDiretoria = await consultaCoordenadoriasByDiretoria(id)
    if (coordenadoriasDiretoria.length === 0) {
      setCoordenadorias([])
    }
    setCoordenadorias(coordenadoriasDiretoria)
  }

  async function getGerenciasByDiretoria(diretoriaId: number) {
    try {
      const resp = await consultaGerenciasByDiretoria(diretoriaId)
      setGerencias(resp)
    } catch (error) {
      console.error('Erro ao buscar gerencias por diretoria:', error)
    }
  }

  async function getGerenciasByCoordenadoria(coordenadoriaId: number) {
    try {
      setGerencias(await consultaGerenciasByCoordenadoria(coordenadoriaId))
    } catch (error) {
      console.error('Erro ao buscar gerencias por coordenadoria:', error)
    }
  }

  async function getServidoresByDiretoria(id: number) {
    try {
      setServidores(await consultaServidoresByDiretoria(id))
    } catch (error) {
      console.error('Erro ao buscar servidores por diretoria:', error)
    }
  }

  async function getServidoresByCoordenadoria(id: number) {
    try {
      setServidores(await consultaServidoresByCoordenadoria(id))
    } catch (error) {
      console.error('Erro ao buscar servidores por coordenadorias:', error)
    }
  }

  async function getServidoresByGerencia(id: number) {
    try {
      setServidores(await consultaServidoresByGerencia(id))
    } catch (error) {
      console.error('Erro ao buscar servidores por gerencia:', error)
    }
  }

  function handleSubmit(data: z.infer<typeof formSchema>) {
    const plantao: Plantao = {
      servidorId: data.servidor?.id,
      saldo: data.saldo,
      inicioPlantao: data.inicioPlantao,
      fimPlantao: data.fimPlantao,
      prescrito: data.prescrito ?? undefined,
      converterPecunia: data.converterPecunia ?? undefined,
    }
    if (data.servidor) {
      toast({
        variant: 'destructive',
        title: 'solicitação não pode ser vazia',
        description: 'seleção vazia esta vazia',
        action: <ToastAction altText="fechar">fechar</ToastAction>,
        duration: 5000,
      })
    }
    try {
      salvarPlantao(plantao)
      toast({
        title: 'Salvo com sucesso',
        action: <ToastAction altText="Fechar">fechar</ToastAction>,
        duration: 2000,
      })
      router.back()
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Ocorreu um erro na solicitação',
        action: (
          <ToastAction altText="Goto schedule to undo">fechar</ToastAction>
        ),
        duration: 5000,
      })
    }
  }

  function handleCancel() {
    form.reset({
      diretoria: undefined,
      coordenadoria: undefined,
      gerencia: undefined,
      servidor: undefined,
      saldo: undefined,
      fimPlantao: undefined,
      inicioPlantao: undefined,
      prescrito: false,
      converterPecunia: false,
    })
    setCoordenadorias([])
    setGerencias([])
    setServidores([])
  }

  async function handleDiretoria(selectedDiretoria: Diretoria) {
    form.setValue('diretoria', selectedDiretoria)
    form.setValue('coordenadoria', null)
    form.setValue('gerencia', null)
    await getCoordenadorias(selectedDiretoria.id)
    if (coordenadorias.length === 0 && selectedDiretoria) {
      await getGerenciasByDiretoria(selectedDiretoria.id)
    }
    if (
      selectedDiretoria &&
      coordenadorias.length === 0 &&
      gerencias.length === 0
    ) {
      getServidoresByDiretoria(selectedDiretoria.id)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <Select
              onValueChange={async (newValue) => {
                setCoordenadorias([])
                setGerencias([])
                setServidores([])
                const selectedDiretoria = listaDiretorias.find(
                  (diretoria) => diretoria.nome === newValue,
                )
                if (selectedDiretoria) {
                  handleDiretoria(selectedDiretoria)
                }
              }}
            >
              <SelectTrigger id="diretoria">
                <SelectValue placeholder="Selecione a diretoria" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                ref={(ref) =>
                  ref?.addEventListener('touchend', (e) => e.preventDefault())
                }
              >
                {listaDiretorias.map((diretoria) => (
                  <SelectItem key={diretoria.id} value={diretoria.nome}>
                    {diretoria.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {form.watch('diretoria') && coordenadorias.length > 0 && (
            <div style={{ marginBottom: '0.5rem' }}>
              <Select
                onValueChange={(newValue) => {
                  const selectedCoordenadoria = coordenadorias?.find(
                    (coordenadoria) => coordenadoria.nome === newValue,
                  )
                  if (selectedCoordenadoria) {
                    form.setValue('coordenadoria', selectedCoordenadoria)
                    form.setValue('gerencia', null)
                    getGerenciasByCoordenadoria(selectedCoordenadoria.id)
                  }
                  if (gerencias.length === 0 && selectedCoordenadoria) {
                    getServidoresByCoordenadoria(selectedCoordenadoria.id)
                  }
                }}
              >
                <SelectTrigger id="coordenadoria">
                  <SelectValue placeholder="Selecione a coordenadoria" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  ref={(ref) =>
                    ref?.addEventListener('touchend', (e) => e.preventDefault())
                  }
                >
                  {coordenadorias.map((coordenadoria) => (
                    <SelectItem
                      key={coordenadoria.id}
                      value={coordenadoria.nome}
                    >
                      {coordenadoria.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {form.watch('coordenadoria') && gerencias.length > 0 && (
            <div style={{ marginBottom: '0.5rem' }}>
              <Select
                onValueChange={(newValue) => {
                  const selectedGerencia = gerencias.find(
                    (gerencia) => gerencia.nome === newValue,
                  )
                  if (selectedGerencia) {
                    form.setValue('gerencia', selectedGerencia)
                    getServidoresByGerencia(selectedGerencia.id)
                  }
                }}
              >
                <SelectTrigger id="gerencia">
                  <SelectValue placeholder="Selecione a gerencia" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  ref={(ref) =>
                    ref?.addEventListener('touchend', (e) => e.preventDefault())
                  }
                >
                  {gerencias.map((gerencia) => (
                    <SelectItem key={gerencia.id} value={gerencia.nome}>
                      {gerencia.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {servidores.length > 0 && (
            <div style={{ marginBottom: '0.5rem' }}>
              <Select
                onValueChange={(newValue) => {
                  const selectedServidor = servidores.find(
                    (servidor) => servidor.pessoa.nomeCompleto === newValue,
                  )
                  if (selectedServidor) {
                    form.setValue('servidor', selectedServidor)
                  }
                }}
              >
                <SelectTrigger id="servidor">
                  <SelectValue placeholder="Selecione o servidor" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  ref={(ref) =>
                    ref?.addEventListener('touchend', (e) => e.preventDefault())
                  }
                >
                  {servidores.map((servidor) => (
                    <SelectItem
                      key={servidor.id}
                      value={servidor.pessoa.nomeCompleto}
                    >
                      {servidor.pessoa.nomeCompleto}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* {form.watch('diretoria') && coordenadorias.length > 0 && ( */}
          {form.watch('servidor') !== null && form.watch('servidor') && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <FormField
                  control={form.control}
                  name="saldo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crédito</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Preencher com a quantidade de crédito(s)"
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <FormField
                  control={form.control}
                  name="inicioPlantao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data inicio do plantão</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Data início do plantão"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <FormField
                  control={form.control}
                  name="fimPlantao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data fim do plantão</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Data fim do plantão"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-4 block">
                <FormField
                  control={form.control}
                  name="converterPecunia"
                  render={({ field }) => (
                    <FormItem className="flex">
                      <div className="flex items-center gap-x-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked)
                              if (checked) {
                                form.setValue('prescrito', false)
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel>Apto para Pecúnia ?</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-4 block">
                <FormField
                  control={form.control}
                  name="prescrito"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-x-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked)
                              if (checked) {
                                form.setValue('converterPecunia', false)
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel>Prescrito ?</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </div>
        <div>
          <Button
            type="submit"
            className="mr-5 dark:bg-primary/35 dark:text-white dark:hover:bg-primary/50"
          >
            Salvar
          </Button>
          <Button
            type="button"
            variant="outline"
            className="dark:border-primary/35 dark:text-white dark:hover:bg-primary/50"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  )
}
