import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { CommandList } from 'cmdk'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Pessoa } from '@/types/Servidor'

interface ListItem {
  nome?: string
  pessoa?: Pessoa
  diretoria?: string
  gerencia?: string
  coordenadoria?: string
}

type ComboboxProps<T extends ListItem> = {
  selecTitle: string
  list: T[]
  handleClick: (value: string) => void
  getValue: (item: T) => string
  getLabel: (item: T) => string
}

export function CursoCombobox<T extends ListItem>({
  selecTitle,
  list,
  handleClick,
  getValue,
  getLabel,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const selectedItem = value
    ? list.find((listData) => getValue(listData) === value)
    : undefined

  const displayName = selectedItem
    ? selectedItem.nome || selectedItem.pessoa?.nomeCompleto
    : selecTitle

  function handleChangeSelectValue(newValue: string) {
    setOpen(false)
    setValue(newValue)
    handleClick(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="size-full justify-between text-gray-900  dark:border-gray-700 dark:text-gray-50"
        >
          {value ? displayName : selecTitle}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50 dark:opacity-75" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 dark:border-gray-700 min-[320px]:w-[25] sm:w-[32rem] md:w-[32rem] lg:w-[40rem] xl:w-[56rem] 2xl:w-[98rem]">
        <Command onClick={(e) => e.preventDefault()} className="w-full">
          <CommandInput placeholder={selecTitle} className="h-9" />
          <CommandGroup className="text-gray-950">
            <CommandList className="max-h-72 w-full overflow-y-auto text-gray-950 dark:text-gray-50">
              {list.map((item) => (
                <CommandItem
                  className="cursor-pointer"
                  key={getValue(item)}
                  value={getValue(item)}
                  // onSelect={() => handleChangeSelectValue(getValue(item))}
                  onSelect={() => handleChangeSelectValue(getValue(item))}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === getValue(item) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {getLabel(item)}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
