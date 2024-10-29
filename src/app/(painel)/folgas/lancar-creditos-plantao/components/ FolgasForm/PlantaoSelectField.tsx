import { DateField } from '@/components/Shared/DataField'
import { Button } from '@/components/ui/button'
import {
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
import { Control, FieldValues, Path } from 'react-hook-form'

type PlantaoFieldProps<T extends FieldValues> = {
  name: Path<T>
  nameSelect: Path<T>
  nameText: Path<T>
  // form: UseFormReturn<T>
  control: Control<T>
  id?: string | undefined
  removePlantao: (index: number) => void
  listIndex: number
  text: string
  label: string
  // value?: string | string[] | boolean | null | ''
  // valuesec?: string | string[] | boolean | null | ''
  // valueter?: string | string[] | boolean | null | ''
}
export function PlantaoSelectField<T extends FieldValues>({
  id,
  name,
  nameSelect,
  nameText,
  control,
  text,
  label,
  removePlantao,
  listIndex,
  // value,
  // valuesec,
  // valueter,
}: PlantaoFieldProps<T>) {
  return (
    <>
      <div className="flex flex-row items-center gap-x-3.5">
        <DateField name={name} control={control} label={'Data do plantão'} />
        <FormField
          control={control}
          name={nameSelect}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Peso do plantão</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={(newValue) =>
                    field.onChange(parseFloat(newValue))
                  }
                >
                  <SelectTrigger id={id} className="w-[233px]">
                    <SelectValue placeholder="Selecione o peso" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value={String(value)}>0,5</SelectItem>
                      <SelectItem value={String(valuesec)}>1</SelectItem>
                      <SelectItem value={String(valueter)}>2</SelectItem> */}
                    <SelectItem value="0.5">0,5</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              {/* {fieldState.error && ( */}
              <FormMessage />
              {/* )} */}
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={() => removePlantao(listIndex)}
          className="mt-5 bg-red-500 dark:text-white dark:hover:bg-red-800"
        >
          Remover
        </Button>
        <FormField
          control={control}
          name={nameText}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input type="text" placeholder={text} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}
