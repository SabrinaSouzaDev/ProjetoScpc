'use client'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, FieldValues, Path } from 'react-hook-form'

interface SaldoFieldProps<T extends FieldValues> {
  name: Path<T>
  label: string
  text?: string
  // form: UseFormReturn<T>
  control: Control<T>
  onChange?: (value: string) => void
}

export function FormFieldComponent<T extends FieldValues>({
  name,
  label,
  text,
  control,
}: SaldoFieldProps<T>) {
  return (
    <FormField<T>
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="text"
              step="0.1" // Permite números fracionados
              placeholder={text}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
