/* eslint-disable @typescript-eslint/no-unused-vars */
import { updateEscalaEditRequest } from '@/app/services/client/EditEscalaPlantaoPut'
import {
  consultaCoordenadoriasByDiretoria,
  consultaGerenciasByCoordenadoria,
  consultaGerenciasByDiretoria,
  consultaServidoresByCoordenadoria,
  consultaServidoresByDiretoria,
  consultaServidoresByGerencia,
} from '@/app/services/client/ScpcServiceClient'
import { getHolidays } from '@/app/services/dateService'
import { consultaDiretorias } from '@/app/services/server/ScpcServiceServer'
import { Form } from '@/components/ui/form'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { Holidays } from '@/types/Date'
import { Servidor } from '@/types/Servidor'
import {
  Coordenadoria,
  Diretoria,
  Gerencia,
} from '@/types/UnidadesAdministrativas'
import { ErrorMapping } from '@/utils/errorMapping'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EscalaEditFormSchema } from '../TypeEditPlantaoEdit/EscalaFormSchema'
import { EscalaPlantao } from '../TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'
import AdicionarConfirmFormFields from './AdicionarConfirmFormFields'
import AdicionarFormField from './AdicionarFormField'

interface EscalaFormProps {
  id: number
  initialValues: EscalaPlantao
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function EscalaEditForm({ id, initialValues }: EscalaFormProps) {
  const form = useForm<z.infer<typeof EscalaEditFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(EscalaEditFormSchema),
    defaultValues: {
      id: initialValues?.id,
      diretoria: initialValues?.diretoria?.id
        ? { id: initialValues.diretoria.id, nome: initialValues.diretoria.nome }
        : undefined,
      nucleo: initialValues?.nucleo
        ? { id: initialValues.nucleo.id, nome: initialValues.nucleo.nome }
        : undefined,
      gerencia: initialValues?.gerencia
        ? { id: initialValues.gerencia.id, nome: initialValues.diretoria?.nome }
        : undefined,
      tipo: initialValues?.tipo || '',
      escalasPlantaoDias: initialValues.escalasPlantaoDias?.length
        ? initialValues.escalasPlantaoDias.map((escala) => ({
            id: escala.id ?? undefined,
            servidorId: escala.servidor
              ? { id: escala.servidor.id, nome: escala.servidor.nome }
              : undefined,
            // dia: escala.dia
            // ? {
            //     id: escala.dia.id,
            //     dia: escala.dia.dia,
            //   }
            // : undefined,
          }))
        : [],
    },
  })
  console.log('dados', initialValues.escalasPlantaoDias?.[0].id || 'erro vazio')
  const [servidor, setServidor] = useState<Servidor | null>(
    form.watch('escalasPlantaoDias.0.servidorId') as Servidor,
  )
  const [coordenadorias, setCoordenadorias] = useState<Coordenadoria[] | []>([])
  const [serverList, setServerList] = useState<number[]>([])
  const [gerencias, setGerencias] = useState<Gerencia[] | []>([])
  const [servidores, setServidores] = useState<Servidor[] | []>([])
  const [listDiretorias, setListDiretorias] = useState<Diretoria[] | []>([])
  const [holidaysList, setHolidaysList] = useState<Holidays[] | []>([])
  const [lastPage, setLastPage] = React.useState<boolean>(false)
  const { toast } = useToast()
  console.log('dfsfsdf', id)
  console.log('dfsfsdf', initialValues)
  const [valueObject, setValueObject] = useState({
    diretoriaId: 0,
    coordenadoria: 0,
    gerencia: 0,
  })

  const { setValue, reset } = form

  // const setFieldsToDefault = () => {
  //   setCoordenadorias([])
  //   setGerencias([])
  //   setServidores([])
  //   setValueObject({
  //     coordenadoria: 0,
  //     diretoriaId: 0,
  //     gerencia: 0,
  //   })
  //   reset({
  //     nucleo: {},
  //     escalasPlantaoDias: [],
  //     diretoria: {},
  //     gerencia: {},
  //     tipo: undefined,
  //   })
  // }

  // Função para buscar as diretorias

  const fetchDirectorias = async () => {
    try {
      const directoryResponse = await consultaDiretorias()
      setListDiretorias(directoryResponse)
    } catch (err) {
      ErrorMapping('Ocorreu um erro ao solicitar os dados da diretoria')
    }
  }
  const fetchHolidays = async () => {
    try {
      const holidaysResponse = await getHolidays()
      setHolidaysList(holidaysResponse)
      console.log('dentro', holidaysList)
    } catch (err) {
      ErrorMapping('Ocorreu um erro ao solicitar os dados dos feriados')
    }
  }

  // Função para buscar ambos os dados em paralelo
  const fetchData = async () => {
    try {
      await Promise.all([fetchDirectorias(), fetchHolidays()])
    } catch (err) {
      ErrorMapping('Ocorreu um erro ao solicitar os dados necessários')
    }
  }

  /// /////////////////// GET API
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

  /// /////////////////// GET API

  async function handleSubmit(data: z.infer<typeof EscalaEditFormSchema>) {
    const EscalaEdit: EscalaPlantao = {
      id: data.id,
      diretoria: data.diretoria
        ? { id: data.diretoria.id, nome: data.diretoria.nome }
        : null,
      gerencia: data.gerencia
        ? { id: data.gerencia.id, nome: data.gerencia.nome }
        : null,
      nucleo: data.nucleo
        ? { id: data.nucleo.id, nome: data.nucleo.nome }
        : null,
      tipo: data.tipo ?? '',
      escalasPlantaoDias: data.escalasPlantaoDias?.length
        ? data.escalasPlantaoDias?.map((escala) => ({
            id: escala?.id ?? undefined,
            servidorId: escala?.servidorId?.id ?? undefined,
            idDia: escala?.dia?.id ?? undefined,
          }))
        : [],
    }

    let erroTreatment
    try {
      const response = await updateEscalaEditRequest(EscalaEdit)
      if (response !== 'SUCCESS_UPDATE') {
        erroTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      toast({
        title: 'Dados financeiro atualizados com sucesso',
        duration: 3000,
      })
      // setFieldsToDefault()
    } catch (err) {
      toast({
        variant: 'destructive',
        title: erroTreatment || 'Erro ao realizar solicitação',
        duration: 4000,
      })
    }
  }

  // // CHAMADA DE RESPOSTA API
  async function handleDiretoria(selectedDiretoria: Diretoria) {
    form.setValue('diretoria', selectedDiretoria)
    form.setValue('nucleo', null)
    setCoordenadorias([])
    setGerencias([])
    form.setValue('gerencia', null)

    await Promise.all([
      getCoordenadorias(selectedDiretoria.id),
      getGerenciasByDiretoria(selectedDiretoria.id),
      getServidoresByDiretoria(selectedDiretoria.id),
    ])
  }

  async function handleGetBoard(value: string) {
    setCoordenadorias([])
    setGerencias([])
    setServidores([])

    const selectedDiretoria = listDiretorias.find(
      (diretoria) => String(diretoria.id) === value,
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
      form.setValue('nucleo', selectedCoordenadoria)
      form.setValue('gerencia', null)
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
      form.setValue('gerencia', selectedGerencia)
      getServidoresByGerencia(selectedGerencia.id)
    }
  }

  // const Escala = form.getValues('escalasPlantaoDias')
  //   const EscalaDias = Escala?.map((escala) => {
  //     return (escala?.idDia?.id ?? 0)
  //   }, 0)
  const handleSelectServer = (server: string, index: number) => {
    const response = servidores.filter(
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

    setValue(`escalasPlantaoDias.${index}.servidorId.id`, serverId)
    serverList.includes(serverId)
      ? setServerList(serverList.filter((id) => id !== serverId))
      : setServerList([...serverList, serverId])
  }

  async function handleFindServerName(value: string, index: number) {
    const selectedServidor = servidores.find(
      (servidor) => servidor.pessoa.nomeCompleto === value,
    )
    if (selectedServidor) {
      form.setValue(`escalasPlantaoDias.${index}.servidorId`, selectedServidor)
      setServidor(selectedServidor)
    }
  }
  // // CHAMADA DE RESPOSTA API
  function setNextPage() {
    setLastPage(!lastPage)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Form {...form}>
      {lastPage ? (
        <AdicionarConfirmFormFields
          form={form}
          handleSubmit={handleSubmit}
          handleReturn={setNextPage}
        />
      ) : (
        <AdicionarFormField
          handleFindServerName={handleFindServerName}
          handleSelectServer={handleSelectServer}
          initialValues={initialValues}
          servidor={servidor}
          form={form}
          handleGetBoard={handleGetBoard}
          handleGetCoordination={handleGetCoordination}
          handleGetManagement={handleGetManagement}
          handleSubmit={setNextPage}
          coordenadorias={coordenadorias}
          gerencias={gerencias}
          servidores={servidores}
          listDiretorias={listDiretorias}
          holidaysList={holidaysList}
        />
      )}
    </Form>
  )
}
