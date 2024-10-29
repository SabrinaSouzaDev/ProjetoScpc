'use client'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import React from 'react'
import { Control, UseFormReturn, FieldValues, Path } from 'react-hook-form'

interface CheckboxFieldProps<T extends FieldValues> {
  name: Path<T>
  label: string
  text: Path<T>
  form: UseFormReturn<T>
  control: Control<T>
}

export function CheckboxFieldUnique<T extends FieldValues>({
  name,
  label,
  control,
  // text,
  // form,
}: CheckboxFieldProps<T>) {
  return (
    <FormField<T>
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-x-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked)
                }}
                // onCheckedChange={(checked) => {
                //   field.onChange(!field.value)
                //   if (typeof form.getValues(text) === 'boolean') {
                //     form.setValue(text, !checked as PathValue<T, Path<T>>)
                //   } else if (typeof form.getValues(text) === 'undefined') {
                //     form.setValue(text, !checked as PathValue<T, Path<T>>)
                //   }
                // }}
              />
            </FormControl>
            <FormLabel>{label}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
