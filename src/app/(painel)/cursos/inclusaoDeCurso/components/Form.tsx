'use client'

import { salvarCurso } from '@/app/services/client/ScpcServiceClient'
import { DateField } from '@/components/Shared/DataField'
import { SelectForm } from '@/components/Shared/SelectForm'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { EventList, EventTypeList, KnowledgeList } from './formUtilsList'
import { InclusaoformSchema } from './typo/SchemaFormCurso'
import { CursoType } from '../../type/CursoType'

type FormValues = z.infer<typeof InclusaoformSchema>

interface FormProps {
  Session: {
    diretoriaId: number
    nucleoId?: number
    gerenciaId?: number
    idServidor: number
  }
}

export default function Form({ Session }: FormProps) {
  const { toast } = useToast()
  const [annexFile, setAnnexFile] = useState<File>()
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado')

  const form = useForm<FormValues>({
    resolver: zodResolver(InclusaoformSchema),
    mode: 'onChange',
    defaultValues: {
      diretoriaId: Session.diretoriaId, // Usando os valores da sessão
      gerenciaId: Session.gerenciaId,
      nucleoId: Session.nucleoId,
      idServidor: Session.idServidor,
      areaDeConhecimento: {},
      tipoDoEvento: {},
      modalidadeDoEvento: {},
      titulo: '',
      cargaHoraria: undefined,
      nomeInstituicao: '',
      periodo: undefined,
      periodoFim: undefined,
      dataCertificacao: undefined,
      email: '',
    },
  })
  const { errors } = form.formState

  const handleSubmit = (data: z.infer<typeof InclusaoformSchema>) => {
    const curso: CursoType = {
      diretoriaId: data.diretoriaId ?? data.diretoriaId,
      gerenciaId: data.gerenciaId ? data.gerenciaId : undefined,
      nucleoId: data.nucleoId ? data.nucleoId : undefined,
      idServidor: data.idServidor,
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
      nome: data.titulo,
      certificado: data.certificado,
    }
    // Este é o arquivo PDF
    const certificado = data.certificado

    if (!data.idServidor) {
      toast({
        variant: 'destructive',
        title: 'solicitação não pode ser vazia',
        description: 'seleção esta vazia',
        action: <ToastAction altText="fechar">fechar</ToastAction>,
        duration: 5000,
      })
    }
    try {
      salvarCurso(curso, certificado)
      form.reset({
        ...data,
        areaDeConhecimento: {},
        tipoDoEvento: {},
        modalidadeDoEvento: {},
        titulo: '',
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFileName(file.name)
      setAnnexFile(file)
      form.setValue('certificado', file)
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
            name="titulo"
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
                  {errors.titulo?.message}
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
                    // step="0.1"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value))
                    }}
                  />
                </FormControl>
                <FormMessage className="text-[0.8rem] font-bold">
                  {errors.titulo?.message}
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
                      className="inline-block cursor-pointer rounded bg-primary px-4 py-2 text-center text-gray-50 hover:bg-primary/90"
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
          Cadastrar curso
        </Button>
      </form>
    </ShadcnForm>
  )
}
