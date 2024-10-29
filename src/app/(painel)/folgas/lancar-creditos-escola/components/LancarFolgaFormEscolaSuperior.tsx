'use client'

import {
  consultaCoordenadoriasByDiretoria,
  consultaGerenciasByCoordenadoria,
  consultaGerenciasByDiretoria,
  consultaServidoresByCoordenadoria,
  consultaServidoresByDiretoria,
  consultaServidoresByGerencia,
  salvarFolgas,
} from '@/app/services/client/ScpcServiceClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Credito } from '@/types/Credito'
import { Servidor } from '@/types/Servidor'
import {
  Coordenadoria,
  Diretoria,
  Gerencia,
} from '@/types/UnidadesAdministrativas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaCreditoEscola } from './formSchemaCreditoEscola'
import { ErrorMapping } from '@/utils/errorMapping'

export function FolgasFormEscolaSuperior({
  listaDiretorias,
}: Readonly<{
  listaDiretorias: Diretoria[]
}>) {
  const form = useForm<z.infer<typeof formSchemaCreditoEscola>>({
    resolver: zodResolver(formSchemaCreditoEscola),
    defaultValues: {
      diretoria: undefined,
      coordenadoria: undefined,
      gerencia: undefined,
      servidor: undefined,
      creditos: undefined,
    },
  })
  const { toast } = useToast()

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

  async function handleSubmit(data: z.infer<typeof formSchemaCreditoEscola>) {
    let errorTreatment

    try {
      if (!data.servidor) {
        return
      }

      const credito: Credito = {
        servidorId: data.servidor?.id,
        numeroFolgas: data.creditos,
      }

      const response = await salvarFolgas(credito)

      if (response !== 'SUCCESS_SAVE') {
        errorTreatment = ErrorMapping(response.technicalMessage)
        throw new Error(`Response status: ${response.status}`)
      }

      toast({
        title: 'Crédito Solicitada com sucesso',
        duration: 3000,
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: errorTreatment || 'Erro ao solicitar crédito',
        duration: 4000,
      })
    }
  }

  function handleCancel() {
    form.reset({
      diretoria: undefined,
      coordenadoria: undefined,
      gerencia: undefined,
      servidor: undefined,
      creditos: undefined,
    })
    setCoordenadorias([])
    setGerencias([])
    setServidores([])
  }

  function handleDiretoria(selectedDiretoria: Diretoria) {
    form.setValue('diretoria', selectedDiretoria)
    form.setValue('coordenadoria', null)
    form.setValue('gerencia', null)
    getCoordenadorias(selectedDiretoria.id)
    if (coordenadorias.length === 0 && selectedDiretoria) {
      getGerenciasByDiretoria(selectedDiretoria.id)
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
                  <SelectItem key={coordenadoria.id} value={coordenadoria.nome}>
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
                ref={(
                  // Resolve situação de sobreposição de botões no select
                  ref,
                ) =>
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

        {form.watch('servidor') !== null && form.watch('servidor') && (
          <div style={{ marginBottom: '1rem' }}>
            <Input
              type="number"
              placeholder="Digite a quantidade de folgas"
              {...form.register('creditos', {
                valueAsNumber: true,
              })}
            />
            {form.formState.errors.creditos && (
              <span style={{ color: 'red' }}>
                {form.formState.errors.creditos.message}
              </span>
            )}
          </div>
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
  )
}
