'use client'
import {
  consultaCoordenadoriasByDiretoria,
  consultaCreditosServidor,
  consultaGerenciasByCoordenadoria,
  consultaGerenciasByDiretoria,
  consultaServidoresByCoordenadoria,
  consultaServidoresByDiretoria,
  consultaServidoresByGerencia,
  salvarPlantao,
} from '@/app/services/client/ScpcServiceClient'
import { DateField } from '@/components/Shared/DataField'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import {
  Coordenadoria,
  Diretoria,
  Gerencia,
} from '@/types/UnidadesAdministrativas'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CheckboxFieldUnique } from '@/components/Shared/CheckboxFieldUnique'
import { LoadingLinear } from '@/components/Shared/LoadingLinear'
import { NumberFiel } from '@/components/Shared/NumberFiel'
import { CreditoPlantaoDTO } from '@/types/Credito'
import { useCallback, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { formSchema } from '../schemas/formSchema'
import { Plantao, Servidor } from '../types/plantaoDTO'
import { FolgasFieldDate } from './FolgasFieldsDate'
import { PlantaoSelectField } from './PlantaoSelectField'
import { Combobox } from '@/components/Shared/Combobox'
import { z } from 'zod'
import { FolgasDiretoria } from '@/types/Folga'
import { TableConsulta } from '../SelectConsulta/TableConsulta'

export function FolgasFormDiretorias({ listaDiretorias }: FolgasDiretoria) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      diretoriaId: undefined,
      nucleoId: undefined,
      gerenciaId: undefined,
      servidor: undefined,
      saldo: 0,
      inicioPlantao: undefined,
      fimPlantao: undefined,
      decaido: false,
      converterPecunia: false,
      folgas: [],
      plantaoAdd: [],
    },
  })
  const { control, watch } = form
  const watchSaldo = watch('saldo', 0)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'folgas',
  })
  const {
    fields: plantaoFields,
    append: appendPlantao,
    remove: removePlantao,
  } = useFieldArray({
    control,
    name: 'plantaoAdd',
  })

  const [servidor, setServidor] = useState<Servidor | null>(
    form.watch('servidor') as Servidor,
  )
  const [coordenadorias, setCoordenadorias] = useState<Coordenadoria[]>([])
  const [gerencias, setGerencias] = useState<Gerencia[]>([])
  const [servidores, setServidores] = useState<Servidor[]>([])
  const [creditos, setCreditos] = useState<CreditoPlantaoDTO[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isRemoveField, setIsRemoveField] = useState<boolean>(false)

  const getCreditos = useCallback(
    async (servidorId: number) => {
      setLoading(true)
      form.setError('saldo', {
        type: 'manual',
        message: 'valor nulo',
      })
      form.clearErrors()
      try {
        const resp = await consultaCreditosServidor(servidorId)
        const saldoDoBack =
          resp.content?.reduce(
            (prev, curr) => prev + (curr.numeroPesos ?? 0),
            0,
          ) || 0
        const plantaoAdd = form.getValues('plantaoAdd')
        const pesoTotalPlantaoAdd = plantaoAdd.reduce((total, plantao) => {
          return total + (plantao.pesoPlantao ?? 0)
        }, 0)
        const folgas = form.getValues('folgas')
        const totalFolgasUtilizadas = folgas.reduce((total, folga) => {
          return total - (folga.dataUtilizada ? -1 : 0)
        }, 0)
        const saldoFinal =
          saldoDoBack + pesoTotalPlantaoAdd - totalFolgasUtilizadas

        setCreditos(resp.content || [])
        form.setValue('saldo', saldoFinal)
      } catch (error) {
        form.setError('saldo', {
          type: 'disabled',
          message: 'Falha ao buscar créditos. Tente novamente mais tarde.',
        })
        setCreditos([])
        form.setValue('saldo', 0)
      } finally {
        setLoading(false)
      }
    },
    [form],
  )

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        (name?.startsWith('plantaoAdd') && name?.endsWith('pesoPlantao')) ||
        name?.startsWith('servidor') ||
        (name?.startsWith('folgas') && name?.endsWith('dataUtilizada'))
      ) {
        getCreditos(form.watch('servidor').id)
      }
    })

    return () => subscription.unsubscribe()
  }, [getCreditos, form])

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
      setGerencias(await consultaGerenciasByCoordenadoria(coordenadoriaId))
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
      setServidores(await consultaServidoresByDiretoria(id))
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
      setServidores(await consultaServidoresByCoordenadoria(id))
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
      setServidores(await consultaServidoresByGerencia(id))
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

  function handleCancel() {
    form.reset({
      diretoriaId: {},
      nucleoId: {},
      gerenciaId: {},
      servidor: {},
      saldo: 0,
      inicioPlantao: undefined,
      fimPlantao: undefined,
      decaido: false,
      converterPecunia: false,
      folgas: [],
      plantaoAdd: [],
    })

    setServidor(null)
    setCoordenadorias([])
    setGerencias([])
    setServidores([])
    setCreditos([])
  }

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    const plantao: Plantao = {
      diretoriaId: data.diretoriaId ? data.diretoriaId?.id : null,
      gerenciaId: data.gerenciaId ? data.gerenciaId?.id : null,
      nucleoId: data.nucleoId ? data.nucleoId?.id : null,
      idServidor: data.servidor?.id,
      saldo: data.saldo,
      folgas: data.folgas.map((folga) => ({
        dataDoPlantao: folga.dataDoPlantao,
        dataUtilizada: folga.dataUtilizada,
        dataDoPlantaoMeio: folga.dataDoPlantaoMeio,
        requerimento: folga.requerimento,
      })),
      fimPlantao: data.fimPlantao
        ? format(new Date(data.fimPlantao), 'yyyy-MM-dd')
        : undefined,
      inicioPlantao: data.inicioPlantao
        ? format(new Date(data.inicioPlantao), 'yyyy-MM-dd')
        : undefined,
      decaido: data.decaido ?? undefined,
      converterPecunia: data.converterPecunia ?? undefined,
      plantaoAdd: data.plantaoAdd.length
        ? data.plantaoAdd?.map((plantaoAdds) => ({
            dataPlantao: plantaoAdds.dataPlantao ?? undefined,
            pesoplantao: plantaoAdds.pesoPlantao ?? undefined,
            pesoMeio: plantaoAdds.pesoPlantao === 0.5,
            pesoDois: plantaoAdds.pesoPlantao === 2,
            pesoUm: plantaoAdds.pesoPlantao === 1,
            processo: plantaoAdds.processo ?? undefined,
          }))
        : [],
    }

    if (data.servidor) {
      toast({
        variant: 'destructive',
        title: 'solicitação não pode ser vazia',
        description: 'seleção esta vazia',
        action: <ToastAction altText="fechar">fechar</ToastAction>,
        duration: 5000,
      })
    }
    try {
      salvarPlantao(plantao)
      form.reset({
        ...data,
        saldo: 0,
        inicioPlantao: undefined,
        fimPlantao: undefined,
        decaido: false,
        converterPecunia: false,
        folgas: [],
        plantaoAdd: [],
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

  async function handleDiretoria(selectedDiretoria: Diretoria) {
    form.setValue('diretoriaId', selectedDiretoria)
    form.setValue('nucleoId', null)
    setCoordenadorias([])
    setGerencias([])
    form.setValue('gerenciaId', null)

    await Promise.all([
      getCoordenadorias(selectedDiretoria.id),
      getGerenciasByDiretoria(selectedDiretoria.id),
      getServidoresByDiretoria(selectedDiretoria.id),
    ])
  }

  const addFolga = () => {
    append({
      dataDoPlantao: undefined,
      dataUtilizada: undefined,
      dataDoPlantaoMeio: undefined,
    })
  }

  const inicioPlantao = watch('inicioPlantao')
  const fimPlantao = watch('fimPlantao')

  async function handleGetBoard(value: string) {
    setCoordenadorias([])
    setGerencias([])
    setServidores([])
    const selectedDiretoria = listaDiretorias.find(
      (diretoria) => diretoria.nome === value,
    )
    if (selectedDiretoria) {
      handleDiretoria(selectedDiretoria)
    }
  }

  async function handleGetCoordination(value: string) {
    const selectedCoordenadoria = coordenadorias.find(
      (coordenadoria) => coordenadoria.nome === value,
    )
    if (selectedCoordenadoria) {
      form.setValue('nucleoId', selectedCoordenadoria)
      form.setValue('gerenciaId', null)
      getGerenciasByCoordenadoria(selectedCoordenadoria.id)
      getServidoresByCoordenadoria(selectedCoordenadoria.id)
    } else {
      // Se a coordenadoria não for encontrada, tratar como "Outro"
      getServidoresByDiretoria(0) // Ajuste
    }
  }
  async function handleGetManagement(value: string) {
    const selectedGerencia = gerencias.find(
      (gerencia) => gerencia.nome === value,
    )
    if (selectedGerencia) {
      form.setValue('gerenciaId', selectedGerencia)
      getServidoresByGerencia(selectedGerencia.id)
    }
  }

  async function handleFindServerName(value: string) {
    const selectedServidor = servidores.find(
      (servidor) => servidor.pessoa.nomeCompleto === value,
    )
    if (selectedServidor) {
      form.setValue('servidor', selectedServidor)
      setServidor(selectedServidor)
      getCreditos(selectedServidor.id)
    }
  }

  function handleRemovePlantao(index: number) {
    setIsRemoveField(true)
    removePlantao(index)
  }

  useEffect(() => {
    if (isRemoveField) {
      return setIsRemoveField(false)
    }

    if (inicioPlantao && fimPlantao) {
      const startDate = new Date(inicioPlantao)
      const endDate = new Date(fimPlantao)
      const daysDifference =
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1
      const currentFieldsCount = plantaoFields.length

      if (daysDifference > currentFieldsCount) {
        for (let i = currentFieldsCount; i < daysDifference; i++) {
          appendPlantao({
            dataPlantao: undefined,
            pesoPlantao: undefined,
            processo: undefined,
          })
        }
      } else if (daysDifference < currentFieldsCount) {
        for (let i = currentFieldsCount; i > daysDifference; i--) {
          removePlantao(i - 1)
        }
      }
    }
  }, [
    inicioPlantao,
    fimPlantao,
    appendPlantao,
    removePlantao,
    plantaoFields.length,
  ])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mb-4">
          <div style={{ marginBottom: '0.5rem' }}>
            <Combobox
              selecTitle="Selecione a diretoria"
              handleClick={handleGetBoard}
              list={listaDiretorias}
              getLabel={(item) => item.nome}
              getValue={(item) => item.nome}
            />
          </div>

          {form.watch('diretoriaId') && coordenadorias.length > 0 && (
            <div style={{ marginBottom: '0.5rem' }}>
              <Combobox
                selecTitle="Selecione a coordenadoria"
                handleClick={handleGetCoordination}
                list={coordenadorias}
                getLabel={(item) => item.nome}
                getValue={(item) => item.nome}
              />
            </div>
          )}

          {form.watch('nucleoId') && gerencias.length > 0 && (
            <div style={{ marginBottom: '0.5rem' }}>
              <Combobox
                selecTitle="Selecione a gerencia"
                handleClick={handleGetManagement}
                list={gerencias}
                getLabel={(item) => item.nome}
                getValue={(item) => item.nome}
              />
            </div>
          )}
          {servidores.length > 0 && (
            <div style={{ marginBottom: '0.5rem' }}>
              <Combobox
                selecTitle="Selecione o servidor"
                handleClick={handleFindServerName}
                list={servidores}
                getLabel={(item) => item.pessoa.nomeCompleto}
                getValue={(item) => item.pessoa.nomeCompleto}
              />
            </div>
          )}

          {servidor !== undefined && servidor !== null ? (
            <>
              <div className="relative top-8 flex w-full justify-end">
                {loading ? <LoadingLinear /> : null}
              </div>

              <div className="mb-4">
                <NumberFiel
                  name={'saldo'}
                  text={'Preencher com a quantidade de crédito(s)'}
                  label={'Crédito'}
                  control={form.control}
                />
              </div>

              <div className="mb-4 flex flex-row flex-wrap items-center gap-4">
                <DateField
                  name="inicioPlantao"
                  control={form.control}
                  label={'Data inicio do plantão'}
                />
                <DateField
                  name="fimPlantao"
                  control={form.control}
                  label={'Data fim do plantão'}
                />
              </div>

              <p className="text-[0.7rem] text-amber-400 sm:text-[0.8rem] md:text-[0.9rem]">
                Data do plantão necessita ser informada, para que as informações
                de plantão sejam validadas
              </p>

              {plantaoFields.map((plantao, index) => (
                <div key={plantao.id} className="my-3">
                  <PlantaoSelectField
                    nameText={`plantaoAdd.${index}.processo`}
                    label="Inclusão de processo"
                    text="Inserir o processo"
                    name={`plantaoAdd.${index}.dataPlantao`}
                    nameSelect={`plantaoAdd.${index}.pesoPlantao`}
                    control={form.control}
                    id={`pesoPlantao-${index}`}
                    removePlantao={() => handleRemovePlantao(index)}
                    listIndex={index}
                  />
                </div>
              ))}

              <div className="my-6 flex flex-row flex-wrap gap-8">
                <Button
                  className="dark:bg-primary/35 dark:text-white dark:hover:bg-primary/50"
                  type="button"
                  onClick={addFolga}
                  disabled={Math.floor(watchSaldo) <= fields.length}
                >
                  Adicionar Folga
                </Button>
              </div>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <FolgasFieldDate
                    name={`folgas.${index}.dataDoPlantao`}
                    nameSelect={`folgas.${index}.dataUtilizada`}
                    nameTerciario={`folgas.${index}.dataDoPlantaoMeio`}
                    nameQuaternario={`folgas.${index}.requerimento`}
                    label="Data do plantão"
                    labelSecundario="Folga usufruída"
                    labelTerciario="Data do plantão meio"
                    labelQuaternario="Requerimento"
                    control={form.control}
                    value={field.dataDoPlantao}
                    valueSecundario={field.dataUtilizada}
                    valueTerciario={field.dataDoPlantaoMeio}
                    onChange={(value) =>
                      form.setValue(
                        `folgas.${index}.dataDoPlantao`,
                        value ? new Date(value) : undefined,
                      )
                    }
                    onChangeSecundario={(valueSecundario) =>
                      form.setValue(
                        `folgas.${index}.dataUtilizada`,
                        valueSecundario ? new Date(valueSecundario) : undefined,
                      )
                    }
                    onChangeTerciario={(valueTerciario) =>
                      form.setValue(
                        `folgas.${index}.dataDoPlantaoMeio`,
                        valueTerciario ? new Date(valueTerciario) : undefined,
                      )
                    }
                    remove={() => remove(index)}
                  />

                  <p className="text-[0.7rem] text-amber-400 sm:text-[0.8rem] md:text-[0.9rem]">
                    Quando preencher o campo: Data do plantão meio, inserir
                    também o campo: data do plantão meio
                  </p>
                </div>
              ))}

              <div className="my-4 block">
                <CheckboxFieldUnique
                  name={'converterPecunia'}
                  label={'Apto para Pecúnia ?'}
                  text={'converterPecunia'}
                  form={form}
                  control={form.control}
                />
              </div>

              <div className="my-4 block">
                <CheckboxFieldUnique
                  name={'decaido'}
                  label={'decaido ?'}
                  text={'decaido'}
                  form={form}
                  control={form.control}
                />
              </div>
            </>
          ) : null}
        </div>

        <div>
          <Button
            type="submit"
            variant="outline"
            className="mr-5 bg-green-600 dark:text-white"
          >
            Salvar
          </Button>
          <Button
            type="button"
            variant="outline"
            className="bg-red-600 dark:text-white"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>

        <TableConsulta creditos={creditos} loading={loading} />
      </form>
    </Form>
  )
}
