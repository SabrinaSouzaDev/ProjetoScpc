'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Control, FieldValues, Path } from 'react-hook-form'

interface DateFieldProps<T extends FieldValues> {
  name: Path<T>
  label: string
  control: Control<T>
  onChange?: (value: string) => void
  disabled?: boolean
  value?: string | Date | Date[] | string[] | null

  minDate?: Date
  maxDate?: Date
}

export function DateField<T extends FieldValues>({
  label,
  name,
  disabled = false,
  control,
  minDate,
  maxDate,
}: DateFieldProps<T>) {
  const isDisabledDate = (date: Date) => {
    if (minDate && date > minDate) return true
    if (maxDate && date < maxDate) return true
    return false
  }

  return (
    <FormField<T>
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant="outline"
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? (
                    format(field.value, 'dd/MM/yyyy', {
                      locale: ptBR,
                    })
                  ) : (
                    <span>Escolha uma data</span>
                  )}
                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value && new Date(field.value)}
                onSelect={field.onChange}
                locale={ptBR}
                disabled={disabled || isDisabledDate}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
