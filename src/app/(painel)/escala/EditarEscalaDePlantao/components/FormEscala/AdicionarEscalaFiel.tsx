/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApiError,
  updateEscalaEditRequest,
} from '@/app/services/client/EditEscalaPlantaoPut'
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
import {
  EscalaGetResponse,
  EscalaPlantao,
} from '../TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'
import AdicionarConfirmFormFields from './AdicionarConfirmFormFields'
import AdicionarFormField from './AdicionarFormField'

interface EscalaFormProps {
  id: number
  initialValues: EscalaGetResponse
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function EscalaEditForm({ id, initialValues }: EscalaFormProps) {
  const form = useForm<z.infer<typeof EscalaEditFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(EscalaEditFormSchema),
    defaultValues: {
      id: initialValues?.id ?? null,
      diretoria: initialValues?.diretoria?.id
        ? { id: initialValues.diretoria.id, nome: initialValues.diretoria.nome }
        : null,
      nucleo: initialValues?.nucleo
        ? { id: initialValues.nucleo.id, nome: initialValues.nucleo.nome }
        : null,
      gerencia: initialValues?.gerencia
        ? { id: initialValues.gerencia.id, nome: initialValues.gerencia.nome }
        : null,
      tipo: initialValues?.tipo || '',
      escalasPlantaoDias: initialValues?.escalasPlantaoDias?.length
        ? initialValues.escalasPlantaoDias.map((escala) => ({
            id: escala.id ?? null,
            servidor: escala.dia
              ? { id: escala.servidor?.id, nome: escala.servidor?.nome }
              : undefined,
            dia: escala.dia
              ? {
                  id: escala.dia?.id,
                  dia: escala.dia?.dia,
                }
              : undefined,
          }))
        : [],
    },
  })
  // console.log(
  //   'dados',
  //   initialValues.escalasPlantaoDias?.[0].dia?.id || 'erro vazio',
  // )
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
  const { setValue, reset } = form
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
      console.log('dados da api de DIAS', holidaysList)
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
    if (!data.escalasPlantaoDias || !data.escalasPlantaoDias.length) {
      return toast({
        variant: 'destructive',
        title: 'Erro: Nenhum dado de escala para salvar.',
        duration: 4000,
      })
    }
    const isValid = data.escalasPlantaoDias.every(
      (dia) => dia && dia.servidorId?.id && dia.dia?.id !== undefined,
    )
    if (!isValid) {
      return toast({
        variant: 'destructive',
        title: 'Erro: Preencha todos os campos obrigatórios antes de salvar.',
        duration: 4000,
      })
    }
    const EscalaEdit: EscalaPlantao = {
      id: data.id,
      diretoriaId: data.diretoria ? data.diretoria.id : null,
      gerenciaId: data.gerencia ? data.gerencia.id : null,
      nucleoId: data.nucleo ? data.nucleo.id : null,
      tipo: data.tipo,
      escalasPlantaoDias: data.escalasPlantaoDias?.length
        ? data.escalasPlantaoDias.map((escala) => ({
            id: escala?.id ?? null,
            servidorId: escala?.servidorId?.id ?? undefined, // Garante que seja `undefined` se não houver `servidorId`
            relatorioDescricao: escala?.relatorioDescricao ?? undefined,
            observacaoDia: escala?.observacaoDia ?? undefined,
            idDia: escala?.dia?.id ?? undefined,
          }))
        : [],
    }

    console.log('Dados a serem enviados:', EscalaEdit)

    try {
      const response = await updateEscalaEditRequest(EscalaEdit)
      console.log('Resposta da API:', response)

      if (response !== 'SUCCESS_UPDATE') {
        throw new Error(response?.technicalMessage || 'Erro na atualização.')
      }

      toast({
        title: 'Dados da escala atualizados com sucesso',
        duration: 3000,
      })
    } catch (err) {
      console.error('Erro ao atualizar escala:', err)
      const apiError = err as ApiError
      const errorMessage = ErrorMapping(
        apiError.message || 'Erro ao realizar solicitação',
      )
      toast({
        variant: 'destructive',
        title: errorMessage,
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
