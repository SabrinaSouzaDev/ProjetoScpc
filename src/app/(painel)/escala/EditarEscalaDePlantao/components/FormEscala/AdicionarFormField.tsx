/* eslint-disable @typescript-eslint/no-unused-vars */
import { Combobox } from '@/components/Shared/Combobox'
import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Holidays } from '@/types/Date'
import { Servidor } from '@/types/Servidor'
import {
  Coordenadoria,
  Diretoria,
  Gerencia,
} from '@/types/UnidadesAdministrativas'
import { formatDate } from '@/utils/formatDate'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { scaleOption } from '../../../cadastro/components/ScaleOptions'
import { SelectCustomer } from '../SelectCustomer'
import { EscalaEditFormSchema } from '../TypeEditPlantaoEdit/EscalaFormSchema'
import { EscalaGetResponse } from '../TypeEditPlantaoEdit/EstacalaPlantaoEditDTO'
import { CustomerCombobox } from './CustomerCombobox'
import { useEffect, useState } from 'react'

interface FormFieldType {
  form: UseFormReturn<z.infer<typeof EscalaEditFormSchema>>
  coordenadorias: Coordenadoria[]
  // handleFindServerNameNovo: (value: string, index: number) => Promise<void>
  gerencias: Gerencia[]
  servidores: Servidor[]
  listDiretorias: Diretoria[]
  holidaysList: Holidays[]
  servidor: Servidor | null
  initialValues: EscalaGetResponse
  handleSubmit: () => void
  handleGetBoard: (value: string) => void
  handleGetCoordination: (value: string) => void
  handleGetManagement: (value: string) => void
  // handleFindServerName: (server: string) => void
  handleSelectServer: (value: string, index: number) => void
  handleFindServerName: (value: string, index: number) => void
}

export default function AdicionarFormField({
  form,
  handleSubmit,
  handleSelectServer,
  // handleFindServerName,
  handleGetCoordination,
  handleGetBoard,
  handleGetManagement,
  holidaysList,
  coordenadorias,
  listDiretorias,
  gerencias,
  servidores,
  servidor,
  // handleFindServerNameNovo
}: FormFieldType) {
  const { control, getValues } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'escalasPlantaoDias',
  })
  const [isRemoveField, setIsRemoveField] = useState<boolean>(false)

  function handleRemovePlantao(index: number) {
    setIsRemoveField(true)
    remove(index)
  }

  const { errors } = form.formState
  const addEscala = () => {
    append({
      id: undefined,
      dia: undefined,
      servidorId: undefined,
    })
  }

  console.log('valores dentro do formulario', getValues())
  console.log('erro', errors)

  useEffect(() => {
    if (isRemoveField) {
      setIsRemoveField(false)

      // Obtém os valores atuais de escalasPlantaoDias e filtra valores nulos ou undefined
      const escalasPlantaoDias = getValues('escalasPlantaoDias') || []
      const filteredEscalas = escalasPlantaoDias.filter(Boolean)

      // Atualiza o array sem itens nulos/undefined
      if (filteredEscalas.length !== escalasPlantaoDias.length) {
        form.setValue('escalasPlantaoDias', filteredEscalas)
      }
    }
  }, [fields, isRemoveField, getValues, form.setValue])

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col justify-between gap-y-3"
    >
      <div className="flex-col">
        <div className="inline-block w-full rounded-lg align-middle shadow dark:border-gray-700 sm:px-2 lg:px-4">
          <FormField
            control={form.control}
            name="tipo"
            render={() => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Tipo da Escala</FormLabel>
                <SelectCustomer
                  title="Selecione o tipo da escala"
                  subtitle="Opções"
                  options={scaleOption}
                  value={String(form.getValues('tipo') || '')}
                  handleClick={(e: string) => form.setValue('tipo', e)}
                  className="w-full"
                />
                <FormMessage className="font-bold">
                  {errors.tipo?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex flex-row flex-wrap gap-2 py-4">
            <Button
              className="dark:bg-primary/35 dark:text-white dark:hover:bg-primary/50"
              type="button"
              onClick={addEscala}
            >
              Adicionar Servidor
            </Button>
          </div>
          <div className="overflow-y-auto-color flex max-h-[82vh] w-full min-w-[300px] flex-col justify-between gap-2 rounded-sm border border-gray-200 p-2 shadow dark:border-gray-700 sm:w-5/6 md:w-full ">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="w-full flex-col gap-4 rounded-sm border border-gray-200 p-2 shadow dark:border-gray-700"
              >
                <FormField
                  control={form.control}
                  name={`escalasPlantaoDias.${index}.dia.id`}
                  render={() => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="text-[1.1rem]">
                        Data(s) da Escala
                      </FormLabel>
                      <Select
                        onValueChange={(e) =>
                          form.setValue(
                            `escalasPlantaoDias.${index}.dia.id`,
                            Number(e),
                          )
                        }
                        value={String(
                          form.getValues(`escalasPlantaoDias.${index}.dia.id`),
                        )}
                      >
                        <SelectTrigger
                          className="w-full"
                          id={`dia.id-${index}`}
                        >
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
                        {errors.escalasPlantaoDias?.[index]?.dia?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* {listDiretorias.length ? ( */}
                <FormField
                  control={form.control}
                  name={`diretoria.id`}
                  render={() => (
                    <FormItem className="gap-0.9 flex flex-col">
                      <FormLabel className="text-[0.9em]">Diretoria</FormLabel>
                      <CustomerCombobox
                        selecTitle="Selecione a diretoria"
                        handleClick={handleGetBoard}
                        list={listDiretorias}
                        getLabel={(item) => item.nome}
                        getValue={(item) => String(item.id)}
                        initialSelected={String(
                          form.getValues(`diretoria.nome`),
                        )}
                      />
                      <FormMessage className="text-[0.8em] font-bold">
                        {errors.diretoria?.id?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {/* ) : null} */}
                {form.watch('diretoria') && coordenadorias.length > 0 && (
                  <FormItem className="gap-0.9 flex flex-col">
                    <FormLabel className="text-[0.9em]">
                      Coordenadoria
                    </FormLabel>
                    <Combobox
                      selecTitle="Selecione a coordenadoria"
                      handleClick={handleGetCoordination}
                      list={coordenadorias}
                      getLabel={(item) => item.nome}
                      getValue={(item) => item.nome}
                    />
                  </FormItem>
                )}

                {form.watch('nucleo') && gerencias.length > 0 && (
                  <FormItem className="gap-0.9 flex flex-col">
                    <FormLabel className="text-[0.9em]">Gerência</FormLabel>
                    <Combobox
                      selecTitle="Selecione a gerência"
                      handleClick={handleGetManagement}
                      list={gerencias}
                      getLabel={(item) => item.nome}
                      getValue={(item) => item.nome}
                    />
                  </FormItem>
                )}
                {form.getValues(`escalasPlantaoDias.${index}.servidorId.id`) ||
                servidores.length > 0 ? (
                  <FormField
                    control={form.control}
                    name={`escalasPlantaoDias.${index}.servidorId.id`}
                    render={() => (
                      <FormItem className="gap-0.9 flex flex-col">
                        <FormLabel className="text-[0.9em]">Servidor</FormLabel>
                        <CustomerCombobox
                          selecTitle="Selecione o servidor"
                          handleClick={(e) => handleSelectServer(e, index)}
                          list={servidores}
                          getLabel={(item) => item.pessoa.nomeCompleto}
                          getValue={(item) => item.pessoa.nomeCompleto}
                          // || String(form.getValues(`escalasPlantaoDias.${index}.servidorId.id`))
                          initialSelected={
                            String(
                              form.getValues(
                                `escalasPlantaoDias.${index}.servidorId.nome`,
                              ),
                            ) ?? undefined
                          }
                        />
                        <FormMessage className="text-[0.8em] font-bold">
                          {errors?.escalasPlantaoDias?.[index]?.servidorId &&
                            errors.escalasPlantaoDias[index].servidorId.id
                              ?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                ) : null}
                <div className="flex content-center items-center justify-end py-4">
                  <Button
                    type="button"
                    className="bg-red-700 text-white hover:bg-red-800"
                    onClick={() => handleRemovePlantao(index)}
                  >
                    Remover Servidor
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end py-6">
        <Button
          className="bg-green-600 text-white hover:bg-green-700"
          type="submit"
        >
          Atualizar informações
        </Button>
      </div>
    </form>
  )
}
