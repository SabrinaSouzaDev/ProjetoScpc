import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Select } from '@/components/Select'
import { SelectItem } from '@/components/ui/select'
import { NuplanChildrensData } from '@/types/Nuplan'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { nuplanFormSchema } from './NuplanFormSchema'
import { Button } from '@/components/ui/button'

type FormFieldType = {
  detalhamentoFonte: NuplanChildrensData[] | undefined
  convenio: NuplanChildrensData[] | undefined
  funcaoProgramatica: NuplanChildrensData[] | undefined
  gppara: NuplanChildrensData[] | undefined
  naturezaDespesa: NuplanChildrensData[] | undefined
  planoInterno: NuplanChildrensData[] | undefined
  handleSelectChange: (name: string, selectedValue: number) => void
  form: UseFormReturn<z.infer<typeof nuplanFormSchema>>
  handleSubmit: () => void
}

export default function FormFields({
  convenio,
  detalhamentoFonte,
  funcaoProgramatica,
  gppara,
  naturezaDespesa,
  planoInterno,
  handleSelectChange,
  form,
  handleSubmit,
}: FormFieldType) {
  const { errors } = form.formState

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <FormField
        control={form.control}
        name="funcaoProgramaticaId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Função Programática</FormLabel>
            <FormControl>
              <Select
                title="Selecione uma função programática"
                subtitle="Opções:"
                className="w-full"
                handleClick={(selectedValue) =>
                  handleSelectChange(
                    'funcaoProgramaticaId',
                    Number(selectedValue),
                  )
                }
                value={field.value ? String(field.value) : undefined}
              >
                {funcaoProgramatica?.length &&
                  funcaoProgramatica.map(
                    (item: NuplanChildrensData, index: number) => {
                      return (
                        <SelectItem
                          className="max-w-[40rem]"
                          value={String(item.id)}
                          key={index}
                        >
                          {item.codigo} - {item.descricao}
                        </SelectItem>
                      )
                    },
                  )}
              </Select>
            </FormControl>
            <FormMessage className="text-[0.8rem] font-bold">
              {errors.funcaoProgramaticaId?.message}
            </FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gpparaId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>GP Pará</FormLabel>
            <FormControl>
              <Select
                title="Selecione uma GP Pará"
                subtitle="Opções:"
                className="w-full"
                handleClick={(selectedValue) =>
                  handleSelectChange('gpparaId', Number(selectedValue))
                }
                value={field.value ? String(field.value) : undefined}
              >
                {gppara?.length &&
                  gppara.map((item: NuplanChildrensData, index: number) => {
                    return (
                      <SelectItem
                        className="max-w-[40rem]"
                        value={String(item.id)}
                        key={index}
                      >
                        {item.codigo} - {item.descricao}
                      </SelectItem>
                    )
                  })}
              </Select>
            </FormControl>
            <FormMessage className="text-[0.8rem] font-bold">
              {errors.gpparaId?.message}
            </FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="convenioId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Convênio</FormLabel>
            <FormControl>
              <Select
                title="Selecione um convênio"
                subtitle="Opções:"
                className="w-full"
                handleClick={(selectedValue) =>
                  handleSelectChange('convenioId', Number(selectedValue))
                }
                value={field.value ? String(field.value) : undefined}
              >
                {convenio?.length &&
                  convenio.map((item: NuplanChildrensData, index: number) => {
                    return (
                      <SelectItem
                        className="max-w-[40rem]"
                        value={String(item.id)}
                        key={index}
                      >
                        {item.codigo} - {item.descricao}
                      </SelectItem>
                    )
                  })}
              </Select>
            </FormControl>
            <FormMessage className="text-[0.8rem] font-bold">
              {errors.convenioId?.message}
            </FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="detalhamentoFonteId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Detalhamento da Fonte</FormLabel>
            <FormControl>
              <Select
                title="Selecione um detalhamento"
                subtitle="Opções:"
                className="w-full"
                handleClick={(selectedValue) =>
                  handleSelectChange(
                    'detalhamentoFonteId',
                    Number(selectedValue),
                  )
                }
                value={field.value ? String(field.value) : undefined}
              >
                {detalhamentoFonte?.length &&
                  detalhamentoFonte.map(
                    (item: NuplanChildrensData, index: number) => {
                      return (
                        <SelectItem
                          className="max-w-[40rem]"
                          value={String(item.id)}
                          key={index}
                        >
                          {item.codigo} - {item.descricao}
                        </SelectItem>
                      )
                    },
                  )}
              </Select>
            </FormControl>
            <FormMessage className="text-[0.8rem] font-bold">
              {errors.detalhamentoFonteId?.message}
            </FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="naturezaDespesaId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Natureza da Despesa</FormLabel>
            <FormControl>
              <Select
                title="Selecione a natureza da despesa"
                subtitle="Opções:"
                className="w-full"
                handleClick={(selectedValue) =>
                  handleSelectChange('naturezaDespesaId', Number(selectedValue))
                }
                value={field.value ? String(field.value) : undefined}
              >
                {naturezaDespesa?.length &&
                  naturezaDespesa.map(
                    (item: NuplanChildrensData, index: number) => {
                      return (
                        <SelectItem
                          className="max-w-[40rem]"
                          value={String(item.id)}
                          key={index}
                        >
                          {item.codigo} - {item.descricao}
                        </SelectItem>
                      )
                    },
                  )}
              </Select>
            </FormControl>
            <FormMessage className="text-[0.8rem] font-bold">
              {errors.naturezaDespesaId?.message}
            </FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="planoInternoId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Plano Interno</FormLabel>
            <FormControl>
              <Select
                title="Selecione o plano interno"
                subtitle="Opções:"
                className="w-full"
                handleClick={(selectedValue) =>
                  handleSelectChange('planoInternoId', Number(selectedValue))
                }
                value={field.value ? String(field.value) : undefined}
              >
                {planoInterno?.length &&
                  planoInterno.map(
                    (item: NuplanChildrensData, index: number) => {
                      return (
                        <SelectItem
                          className="max-w-[40rem]"
                          value={String(item.id)}
                          key={index}
                        >
                          {item.id} - {item.numeroPi}
                        </SelectItem>
                      )
                    },
                  )}
              </Select>
            </FormControl>
            <FormMessage className="text-[0.8rem] font-bold">
              {errors.planoInternoId?.message}
            </FormMessage>
          </FormItem>
        )}
      />

      <Button type="submit" className="text-white">
        Atualizar informações
      </Button>
    </form>
  )
}
