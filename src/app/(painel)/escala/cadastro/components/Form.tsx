'use client'

import {
  FormItem,
  FormLabel,
  FormMessage,
  Form as ShadcnForm,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { scaleFormSchema } from './ScaleFormSchema'
import {
  Diretoria,
  Coordenadoria,
  Gerencia,
} from '@/types/UnidadesAdministrativas'
import { useEffect, useState } from 'react'
import { Select as ComponentSelect } from '@/components/Select'
import { scaleOption } from './ScaleOptions'
import { FormField } from '@/components/Shared/FormField'
import { Servidor } from '@/types/Servidor'
import {
  handleGetCoordenadoriaList,
  handleGetGerenciaList,
  handleGetUserList,
} from '../scaleFunctions'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/Shared/Combobox'
import {
  createMultipleScaleSchedule,
  createScaleSchedule,
} from '@/app/services/scaleService'
import { useToast } from '@/components/ui/use-toast'
import { ErrorMapping } from '@/utils/errorMapping'
import { Holidays } from '@/types/Date'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatDate } from '@/utils/formatDate'
import { ServerList } from './ServerList'
import { EscalaPlantaoDia } from '@/types/Scale'

interface FormProps {
  listDiretorias: Diretoria[]
  holidaysList: Holidays[]
}

export default function Form({ listDiretorias, holidaysList }: FormProps) {
  const [valueObject, setValueObject] = useState({
    diretoriaId: 0,
    coordenadoria: 0,
    gerencia: 0,
  })
  const [listCoordenadoria, setListCoordenadoria] = useState<
    Coordenadoria[] | []
  >([])
  const [listGerencia, setListGerencia] = useState<Gerencia[] | []>([])
  const [servidorList, setServidorList] = useState<Servidor[]>([])
  const [serverList, setServerList] = useState<number[]>([])
  const form = useForm<z.infer<typeof scaleFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(scaleFormSchema),
  })
  const { getValues, setValue, reset } = form
  const { errors } = form.formState
  const { toast } = useToast()

  const handleUpdateDiretoriaValue = (value: string) => {
    if (!listDiretorias.length) {
      return
    }
    const diretoriaId = listDiretorias.filter((item) => item.nome === value)
    setValueObject({ ...valueObject, diretoriaId: Number(diretoriaId[0]?.id) })
    setValue('diretoriaId', Number(diretoriaId[0]?.id))
  }

  const handleUpdateCoordenadoriaValue = (value: string) => {
    const nucleoId = listCoordenadoria.filter((item) => item.nome === value)
    setValueObject({
      ...valueObject,
      coordenadoria: Number(nucleoId[0]?.id),
    })
    setValue('nucleoId', Number(nucleoId[0]?.id))
  }

  const handleUpdateGerenciaValue = (value: string) => {
    const gerenciaId = listGerencia.filter((item) => item.nome === value)
    setValueObject({ ...valueObject, gerencia: Number(gerenciaId[0]?.id) })
    setValue('gerenciaId', Number(gerenciaId[0]?.id))
  }

  const handleSelectServer = (server: string) => {
    const response = servidorList.filter(
      (item) => item.pessoa.nomeCompleto === server,
    )

    if (!response.length) {
      return
    }

    const serverId = response[0].id

    if (serverList.includes(serverId)) {
      setServerList(serverList.filter((id) => id !== serverId))
    } else {
      setServerList([...serverList, serverId])
    }

    setValue('idServidor', serverId)
    serverList.includes(serverId)
      ? setServerList(serverList.filter((id) => id !== serverId))
      : setServerList([...serverList, serverId])
  }

  const handleRemoveServer = (server: string) => {
    const response = servidorList.find(
      (item) => item.pessoa.nomeCompleto === server,
    )

    if (!response) {
      return
    }

    const serverId = response.id
    if (serverList.includes(serverId)) {
      setServerList(serverList.filter((id) => id !== serverId))
    }
  }

  const setFieldsToDefault = () => {
    setListCoordenadoria([])
    setListGerencia([])
    setServidorList([])
    setServerList([])
    setValueObject({
      coordenadoria: 0,
      diretoriaId: 0,
      gerencia: 0,
    })
    reset({
      nucleoId: undefined,
      idDia: undefined,
      diretoriaId: undefined,
      gerenciaId: undefined,
      idServidor: undefined,
      tipo: undefined,
    })
  }

  const handleSubmit = async (data: z.infer<typeof scaleFormSchema>) => {
    let errorTreatment
    let response
    try {
      if (serverList.length > 1) {
        const { idDia, diretoriaId, tipo, gerenciaId, nucleoId } = data

        const servidoresInfo: EscalaPlantaoDia[] = serverList.map(
          (serverId) => {
            return {
              servidorId: serverId,
              idDia,
            }
          },
        )

        response = await createMultipleScaleSchedule({
          gerenciaId: gerenciaId || undefined,
          nucleoId: nucleoId || undefined,
          diretoriaId,
          tipo,
          escalaPlantaoDia: servidoresInfo,
        })
      } else {
        response = await createScaleSchedule(data)
      }

      if (response !== 'SUCCESS_SAVE') {
        errorTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      toast({
        description: 'Solicitação salva com sucesso',
        duration: 3000,
      })
      setFieldsToDefault()
    } catch (err) {
      toast({
        variant: 'destructive',
        description:
          errorTreatment || 'Ocorreu um erro ao salvar solicitação de escala!',
        duration: 3000,
      })
    }
  }

  useEffect(() => {
    const fetchCoordenadoriaList = async () => {
      if (valueObject.diretoriaId === 0) {
        return
      }
      const coordenadoriaList = await handleGetCoordenadoriaList(
        valueObject.diretoriaId,
      )
      const userList = await handleGetUserList({
        type: 'DIRETORIA',
        diretoriaId: valueObject.diretoriaId,
      })

      setListCoordenadoria(coordenadoriaList)
      setServidorList(userList)
    }

    fetchCoordenadoriaList()
  }, [valueObject.diretoriaId])

  useEffect(() => {
    const fetchGerenciaList = async () => {
      if (valueObject.coordenadoria === 0) {
        return
      }
      const gerenciaList = await handleGetGerenciaList(
        valueObject.coordenadoria,
      )
      const userList = await handleGetUserList({
        type: 'COORDENADORIA',
        diretoriaId: valueObject.coordenadoria,
      })
      setListGerencia(gerenciaList)
      setServidorList(userList)
    }

    fetchGerenciaList()
  }, [valueObject.coordenadoria])

  useEffect(() => {
    const fetchGerenciaList = async () => {
      if (valueObject.gerencia === 0) {
        return
      }
      const userList = await handleGetUserList({
        type: 'GERENCIA',
        diretoriaId: valueObject.gerencia,
      })
      setServidorList(userList)
    }

    fetchGerenciaList()
  }, [valueObject.gerencia])

  return (
    <ShadcnForm {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="gap-2 space-y-6"
      >
        <FormField
          control={form.control}
          name="tipo"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-[1.1rem]">Tipo da Escala</FormLabel>
              <ComponentSelect
                title="Selecione o tipo da escala"
                subtitle="Opções"
                options={scaleOption}
                value={String(getValues('tipo') || '')}
                handleClick={(e) => setValue('tipo', e)}
                className="w-full"
              />
              <FormMessage className="text-[0.8rem] font-bold">
                {errors.tipo?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idDia"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-[1.1rem]">Data(s) da Escala</FormLabel>
              <Select onValueChange={(e) => setValue('idDia', Number(e))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a data da escala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Opções</SelectLabel>
                    {holidaysList.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {formatDate(item.diaNaoUtil)} -{' '}
                        {item.tipoDiaNaoUtil.descricao}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage className="text-[0.8rem] font-bold">
                {errors.idDia?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {listDiretorias.length ? (
          <FormField
            control={form.control}
            name="diretoriaId"
            render={() => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-[1.1rem]">Diretoria</FormLabel>
                <Combobox
                  selecTitle="Selecione a diretoria"
                  handleClick={handleUpdateDiretoriaValue}
                  list={listDiretorias}
                  getLabel={(item) => item.nome}
                  getValue={(item) => item.nome}
                />
                <FormMessage className="text-[0.8rem] font-bold">
                  {errors.diretoriaId?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        ) : null}

        {listCoordenadoria.length ? (
          <FormItem className="flex flex-col gap-2">
            <FormLabel className="text-[1.1rem]">Coordenadoria</FormLabel>
            <Combobox
              selecTitle="Selecione a coordenadoria"
              handleClick={handleUpdateCoordenadoriaValue}
              list={listCoordenadoria}
              getLabel={(item) => item.nome}
              getValue={(item) => item.nome}
            />
          </FormItem>
        ) : null}

        {listGerencia.length ? (
          <FormItem className="flex flex-col gap-2">
            <FormLabel className="text-[1.1rem]">Gerência</FormLabel>
            <Combobox
              selecTitle="Selecione a gerência"
              handleClick={handleUpdateGerenciaValue}
              list={listGerencia}
              getLabel={(item) => item.nome}
              getValue={(item) => item.nome}
            />
          </FormItem>
        ) : null}

        {servidorList.length ? (
          <div>
            <FormField
              control={form.control}
              name="idServidor"
              render={() => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-[1.1rem]">Servidor</FormLabel>
                  <Combobox
                    selecTitle="Selecione o servidor"
                    handleClick={(e) => handleSelectServer(e)}
                    list={servidorList}
                    getLabel={(item) => item.pessoa.nomeCompleto}
                    getValue={(item) => item.pessoa.nomeCompleto}
                  />

                  <FormMessage className="text-[0.8rem] font-bold">
                    {errors.idServidor?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <ServerList
              serverList={serverList}
              servidorList={servidorList}
              handleRemoveServer={handleRemoveServer}
            />
          </div>
        ) : null}

        <div className="flex gap-4">
          <Button
            type="submit"
            className="min-w-40 bg-green-700 text-white hover:bg-green-800"
          >
            Salvar alterações
          </Button>
        </div>
      </form>
    </ShadcnForm>
  )
}
