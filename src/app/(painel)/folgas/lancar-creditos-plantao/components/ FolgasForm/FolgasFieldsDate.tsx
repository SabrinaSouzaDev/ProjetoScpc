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
import { Control, FieldValues, Path } from 'react-hook-form'

type FolgasFieldDateProps<T extends FieldValues> = {
  name: Path<T>
  nameSelect: Path<T>
  nameTerciario: Path<T>
  nameQuaternario: Path<T>
  label: string
  labelSecundario: string
  labelTerciario: string
  labelQuaternario: string
  // form: UseFormReturn<T>
  control: Control<T>
  remove: () => void
  onChange?: (value: string) => void
  onChangeSecundario?: (value: string) => void
  onChangeTerciario?: (value: string) => void
  value?: string | Date | Date[] | string[] | null
  valueSecundario?: string | Date | Date[] | string[] | null
  valueTerciario?: string | Date | Date[] | string[] | null
}

export function FolgasFieldDate<T extends FieldValues>({
  name,
  nameSelect,
  nameTerciario,
  nameQuaternario,
  control,
  value,
  valueSecundario,
  valueTerciario,
  onChange,
  onChangeSecundario,
  onChangeTerciario,
  remove,
  label,
  labelSecundario,
  labelTerciario,
  labelQuaternario,
}: FolgasFieldDateProps<T>) {
  return (
    <div className="my-3 flex flex-row flex-wrap items-end gap-3 align-middle">
      <DateField
        name={name}
        label={label}
        control={control}
        value={value}
        onChange={onChange}
      />
      <DateField
        name={nameTerciario}
        label={labelTerciario}
        control={control}
        value={valueTerciario}
        onChange={onChangeTerciario}
      />
      <DateField
        name={nameSelect}
        label={labelSecundario}
        control={control}
        value={valueSecundario}
        onChange={onChangeSecundario}
      />
      <div className="justify- flex content-center items-center pb-0.5">
        <Button
          type="button"
          className="bg-red-700 text-white"
          onClick={remove}
        >
          Remover Folga
        </Button>
      </div>
      <FormField
        control={control}
        name={nameQuaternario}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{labelQuaternario}</FormLabel>
            <FormControl>
              <Input type="text" placeholder={labelQuaternario} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
