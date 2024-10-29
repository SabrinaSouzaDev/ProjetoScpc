'use client'

import { Servidor } from '@/app/(painel)/folgas/lancar-creditos-plantao/components/types/plantaoDTO'

import {
  consultaCoordenadoriasByDiretoria,
  consultaGerenciasByCoordenadoria,
  consultaGerenciasByDiretoria,
  consultaServidoresByCoordenadoria,
  consultaServidoresByDiretoria,
  consultaServidoresByGerencia,
  salvarCurso,
} from '@/app/services/client/ScpcServiceClient'
import { Combobox } from '@/components/Shared/Combobox'
import { CursoCombobox } from '@/components/Shared/CursoCombobox'
import { DateField } from '@/components/Shared/DataField'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as ShadcnForm,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import {
  Coordenadoria,
  Diretoria,
  Gerencia,
} from '@/types/UnidadesAdministrativas'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CursoType } from '../../type/CursoType'
import { CursoformSchema } from './CourseFormSchema'
import { EventList, EventTypeList, KnowledgeList } from './formUtilsList'
import { FolgasDiretoria } from '@/types/Folga'
import { SelectForm } from '@/components/Shared/SelectForm'
export default function Form({ listaDiretorias }: FolgasDiretoria) {
  const { toast } = useToast()
  const [annexFile, setAnnexFile] = useState<File>()
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado')
  const form = useForm<z.infer<typeof CursoformSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(CursoformSchema),
    defaultValues: {
      diretoriaId: undefined,
      nucleoId: undefined,
      gerenciaId: undefined,
      servidor: undefined,
      areaDeConhecimento: {},
      tipoDoEvento: {},
      modalidadeDoEvento: {},
      nome: '',
      cargaHoraria: undefined,
      nomeInstituicao: '',
      periodo: undefined,
      periodoFim: undefined,
      dataCertificacao: undefined,
      email: '',
    },
  })
  const { errors } = form.formState
  const [coordenadoria, setCoordenadoria] = useState<Coordenadoria[]>([])
  const [gerencia, setGerencia] = useState<Gerencia[]>([])
  const [servidore, setServidore] = useState<Servidor[]>([])

  const handleSubmit = (data: z.infer<typeof CursoformSchema>) => {
    const curso: CursoType = {
      diretoriaId: data.diretoriaId ? data.diretoriaId?.id : undefined,
      gerenciaId: data.gerenciaId ? data.gerenciaId?.id : undefined,
      nucleoId: data.nucleoId ? data.nucleoId?.id : undefined,
      idServidor: data.servidor?.id,
      areaDeConhecimento: data.areaDeConhecimento
        ? data.areaDeConhecimento.value
        : null,
      modalidadeDoEvento: data.modalidadeDoEvento
        ? data.modalidadeDoEvento.value
        : null,
      tipo: data.tipoDoEvento ? data.tipoDoEvento.value : null,
      cargaHoraria: data.cargaHoraria,
      dataCertificacao: data.dataCertificacao
        ? format(new Date(data.dataCertificacao), 'yyyy-MM-dd')
        : undefined,
      periodo: data.periodo
        ? format(new Date(data.dataCertificacao), 'yyyy-MM-dd')
        : undefined,
      periodoFim: data.periodoFim
        ? format(new Date(data.dataCertificacao), 'yyyy-MM-dd')
        : undefined,
      nomeInstituicao: data.nomeInstituicao,
      email: data.email,
      nome: data.nome,
      certificado: data.certificado,
    }
    const certificado = data.certificado

    if (!data.servidor) {
      toast({
        variant: 'destructive',
        title: 'solicitação não pode ser vazia',
        description: 'seleção esta vazia',
        action: <ToastAction altText="fechar">fechar</ToastAction>,
        duration: 5000,
      })
    }
    if (!certificado) {
      toast({
        variant: 'destructive',
        title: 'Certificado ausente',
        description: 'Por favor, anexe um arquivo PDF como certificado.',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
        duration: 5000,
      })
      return
    }
    try {
      salvarCurso(curso, certificado)
      form.reset({
        ...data,
        areaDeConhecimento: {},
        tipoDoEvento: {},
        modalidadeDoEvento: {},
        nome: '',
        cargaHoraria: undefined,
        nomeInstituicao: '',
        periodo: undefined,
        periodoFim: undefined,
        dataCertificacao: undefined,
        email: '',
      })

      toast({
        title: 'Salvo com sucesso',
        action: <ToastAction altText="Fechar">fechar</ToastAction>,
        duration: 2000,
      })
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

  async function getCoordenadorias(id: number) {
    const coordenadoriasDiretoria = await consultaCoordenadoriasByDiretoria(id)
    if (coordenadoriasDiretoria.length === 0) {
      setCoordenadoria([])
    }
    setCoordenadoria(coordenadoriasDiretoria)
  }

  async function getGerenciasByDiretoria(diretoriaId: number) {
    try {
      const resp = await consultaGerenciasByDiretoria(diretoriaId)
      setGerencia(resp)
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Erro ao buscar gerencias por diretoria',
        action: (
          <ToastAction altText="Goto schedule to undo">fechar</ToastAction>
        ),
        duration: 5000,
      })
    }
  }

  async function getGerenciasByCoordenadoria(coordenadoriaId: number) {
    try {
      setGerencia(await consultaGerenciasByCoordenadoria(coordenadoriaId))
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Erro ao buscar gerencias por coordenadoria',
        action: (
          <ToastAction altText="Goto schedule to undo">fechar</ToastAction>
        ),
        duration: 5000,
      })
    }
  }

  async function getServidoresByDiretoria(id: number) {
    try {
      setServidore(await consultaServidoresByDiretoria(id))
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Erro ao buscar servidores por servidores',
        action: (
          <ToastAction altText="Goto schedule to undo">fechar</ToastAction>
        ),
        duration: 5000,
      })
    }
  }

  async function getServidoresByCoordenadoria(id: number) {
    try {
      setServidore(await consultaServidoresByCoordenadoria(id))
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Erro ao buscar servidores por coordenadorias',
        action: (
          <ToastAction altText="Goto schedule to undo">fechar</ToastAction>
        ),
        duration: 5000,
      })
    }
  }

  async function getServidoresByGerencia(id: number) {
    try {
      setServidore(await consultaServidoresByGerencia(id))
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Erro ao buscar servidores por gerencia',
        action: (
          <ToastAction altText="Goto schedule to undo">fechar</ToastAction>
        ),
        duration: 5000,
      })
    }
  }
  async function handleDiretoria(selectedDiretoria: Diretoria) {
    form.setValue('diretoriaId', selectedDiretoria)
    form.setValue('nucleoId', null)
    setCoordenadoria([])
    setGerencia([])
    form.setValue('gerenciaId', null)

    await Promise.all([
      getCoordenadorias(selectedDiretoria.id),
      getGerenciasByDiretoria(selectedDiretoria.id),
      getServidoresByDiretoria(selectedDiretoria.id),
    ])
  }
  async function handleGetBoard(value: string) {
    setCoordenadoria([])
    setGerencia([])
    setServidore([])
    const selectedDiretoria = listaDiretorias.find(
      (diretoria) => diretoria.nome === value,
    )
    if (selectedDiretoria) {
      handleDiretoria(selectedDiretoria)
    }
  }

  async function handleGetCoordination(value: string) {
    const selectedCoordenadoria = coordenadoria.find(
      (coordenadoria) => coordenadoria.nome === value,
    )
    if (selectedCoordenadoria) {
      form.setValue('nucleoId', selectedCoordenadoria)
      form.setValue('gerenciaId', null)
      getGerenciasByCoordenadoria(selectedCoordenadoria.id)
      getServidoresByCoordenadoria(selectedCoordenadoria.id)
    } else {
      getServidoresByDiretoria(0)
    }
  }
  async function handleGetManagement(value: string) {
    const selectedGerencia = gerencia.find(
      (gerencia) => gerencia.nome === value,
    )
    if (selectedGerencia) {
      form.setValue('gerenciaId', selectedGerencia)
      getServidoresByGerencia(selectedGerencia.id)
    }
  }

  async function handleFindServerName(value: string) {
    const selectedServidor = servidore.find(
      (servidor) => servidor.pessoa.nomeCompleto === value,
    )
    if (selectedServidor) {
      form.setValue('servidor', selectedServidor)
      // setServidor(selectedServidor)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFileName(file.name)
      setAnnexFile(file)
      form.setValue('certificado', file) // Atualiza o valor do campo no formulário
    } else {
      setFileName('Nenhum arquivo selecionado')
    }
  }

  return (
    <ShadcnForm {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="gap-2 space-y-6"
      >
        <div style={{ marginBottom: '0.5rem' }}>
          {listaDiretorias.length === 0 ? (
            <p>Carregando diretorias...</p>
          ) : (
            <Combobox
              selecTitle="Selecione a diretoria"
              handleClick={handleGetBoard}
              list={listaDiretorias}
              getLabel={(item) => item.nome}
              getValue={(item) => item.nome}
            />
          )}
        </div>
        {form.watch('diretoriaId') && coordenadoria.length > 0 && (
          <div style={{ marginBottom: '0.5rem' }}>
            <CursoCombobox
              selecTitle="Selecione a coordenadoria"
              handleClick={handleGetCoordination}
              list={coordenadoria}
              getLabel={(item) => item.nome}
              getValue={(item) => item.nome}
            />
          </div>
        )}
        {form.watch('nucleoId') && gerencia.length > 0 && (
          <div style={{ marginBottom: '0.5rem' }}>
            <CursoCombobox
              selecTitle="Selecione a gerencia"
              handleClick={handleGetManagement}
              list={gerencia}
              getLabel={(item) => item.nome}
              getValue={(item) => item.nome}
            />
          </div>
        )}

        {servidore.length > 0 && (
          <div style={{ marginBottom: '0.5rem' }}>
            <Combobox
              selecTitle="Selecione o servidor"
              handleClick={handleFindServerName}
              list={servidore}
              getLabel={(item) => item.pessoa.nomeCompleto}
              getValue={(item) => item.pessoa.nomeCompleto}
            />
          </div>
        )}
        <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
          <div className="px-y">
            <FormField
              control={form.control}
              name="areaDeConhecimento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[0.8rem]">
                    Área de Conhecimento
                  </FormLabel>
                  <FormControl>
                    <SelectForm
                      title="Selecione a Modalidade do Evento"
                      subtitle="Opções:"
                      className="w-[90%]"
                      value={field.value ? field.value.value : ''} // Mantendo o valor como string
                      handleClick={(selectedValue) => {
                        field.onChange(selectedValue) // Passa o objeto selecionado para o estado do formulário
                      }}
                      options={KnowledgeList}
                    ></SelectForm>
                  </FormControl>
                  <FormMessage className="text-[0.8rem] font-bold">
                    {errors.areaDeConhecimento?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="px-y">
            <FormField
              control={form.control}
              name="tipoDoEvento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[0.8rem]">
                    Tipo do Evento
                  </FormLabel>
                  <FormControl>
                    {/* <select
                                onChange={(e) => {
                                    const selectedId = parseInt(e.target.value);
                                    const selectedObj = EventTypeList.find(option => option.id === selectedId);
                                    field.onChange(selectedObj); // Atualiza o valor do campo com o objeto selecionado
                                }}
                                value={field.value ? field.value.id : ''} // Define o valor do select
                                className="w-[90%]"
                            >
                                <option value="" disabled>Select an option</option>
                                {EventTypeList.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.title}
                                    </option>
                                ))}
                            </select> */}
                    <SelectForm
                      title="Selecione a Modalidade do Evento"
                      subtitle="Opções:"
                      className="w-[90%]"
                      value={field.value ? field.value.value : ''}
                      handleClick={(selectedValue) => {
                        field.onChange(selectedValue)
                      }}
                      options={EventTypeList}
                    ></SelectForm>
                  </FormControl>
                  <FormMessage className="text-[0.8rem] font-bold">
                    {errors.tipoDoEvento?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="px-y">
            <FormField
              control={form.control}
              name="modalidadeDoEvento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[0.8rem]">
                    Modalidade do Evento
                  </FormLabel>
                  <FormControl>
                    <SelectForm
                      title="Selecione a Modalidade do Evento"
                      subtitle="Opções:"
                      className="w-[90%]"
                      value={field.value ? field.value.value : ''}
                      handleClick={(selectedValue) => {
                        field.onChange(selectedValue)
                      }}
                      options={EventList}
                    ></SelectForm>
                  </FormControl>
                  <FormMessage className="text-[0.8rem] font-bold">
                    {errors.modalidadeDoEvento?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-8">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[0.8rem]">
                  Título do Evento
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Título do Evento"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[0.8rem] font-bold">
                  {errors.nome?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cargaHoraria"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[0.8rem]">Carga Horaria</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Preencher com a quantidade de Carga horaria"
                    className="w-full"
                    type="number"
                    step="0.1" // Permite números fracionados
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value))
                    }}
                  />
                </FormControl>
                <FormMessage className="text-[0.8rem] font-bold">
                  {errors.cargaHoraria?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="nomeInstituicao"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[0.8rem]">
                Nome da Instituição
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nome da Instituição"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[0.8rem] font-bold">
                {errors.nomeInstituicao?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
          <div className="px-y">
            <DateField
              name="periodo"
              control={form.control}
              label={'Data inicio do capacitação'}
            />
          </div>
          <div className="px-y">
            <DateField
              name="periodoFim"
              control={form.control}
              label={'Data fim da capacitação '}
            />
          </div>
          <div className="px-y">
            <DateField
              name="dataCertificacao"
              control={form.control}
              label={'Data da emisão do certificado'}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <FormField
            control={form.control}
            name="certificado"
            rules={{ required: 'Por favor, adicione um arquivo PDF' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="certificado" className="text-[0.8rem]">
                  Certificado (PDF)
                </FormLabel>
                <FormControl>
                  <div className="file-upload">
                    <label
                      htmlFor="certificado"
                      className="inline-block cursor-pointer rounded bg-primary px-4 py-2 text-center text-primary-foreground hover:bg-primary/90"
                    >
                      Selecione um arquivo PDF
                      <Input
                        id="certificado"
                        type="file"
                        accept="application/pdf"
                        className="hidden w-full"
                        onChange={handleFileChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </label>
                    <div className="break-all">
                      <p className="mt-2 break-words">{fileName}</p>{' '}
                    </div>
                    {/* Mensagem do nome do arquivo */}
                  </div>
                </FormControl>
                <FormMessage className="text-[0.8rem] font-bold">
                  {errors.certificado?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[0.8rem]">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage className="text-[0.8rem] font-bold">
                {errors.email?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button disabled={!annexFile} className="text-white" type="submit">
          Atualizar informações
        </Button>
      </form>
    </ShadcnForm>
  )
}
