'use client'
import React from 'react'
import {
  Control,
  useController,
  FieldValues,
  Path,
  ControllerRenderProps,
  ControllerFieldState,
} from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  render: (props: {
    field: ControllerRenderProps<T, Path<T>>
    fieldState: ControllerFieldState
  }) => React.ReactNode
}

export function FormField<T extends FieldValues>({
  control,
  name,
  render,
}: FormFieldProps<T>) {
  const { field, fieldState } = useController<T>({ name, control })
  return render({ field, fieldState })
}
