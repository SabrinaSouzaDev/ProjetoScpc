import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { CommandList } from 'cmdk'
import { Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
  initialSelected?: string
  disabled?: boolean
}

export function CustomerCombobox<T extends ListItem>({
  selecTitle,
  list,
  handleClick,
  getValue,
  getLabel,
  initialSelected,
  disabled = false,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(initialSelected || '')
  const [listItems, setListItems] = React.useState(list)

  // Encontrar o item selecionado, seja ServidorId ou Servidor
  const selectedItem = list.find((listData) => getValue(listData) === value)

  // Exibir o nome correto com base no tipo de dado
  const displayName = selectedItem ? getLabel(selectedItem) : value
  // const displayNew = selectedItem
  //   ? selectedItem.nome || selectedItem.pessoa?.nomeCompleto
  //   : selecTitle
  function handleChangeSelectValue(newValue: string) {
    setOpen(false)
    setValue(newValue)
    handleClick(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled} // Desabilita o botão
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="size-full justify-between text-gray-900 dark:border-gray-700  dark:text-gray-50"
        >
          {value ? displayName : selecTitle}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50 dark:opacity-75" />
        </Button>
      </PopoverTrigger>
      {!disabled && ( // Desabilita a interação com o Popover
        <PopoverContent className="w-full p-0 dark:border-gray-700 xl:w-[50rem]  2xl:w-[80rem]">
          <Command
            shouldFilter={false}
            onClick={(e) => e.preventDefault()}
            className="w-full"
          >
            <CommandInput
              onValueChange={(search) => {
                console.log('SEACH VALUE: ', search)
                const filteredList = list.filter((item) => {
                  const currentValue = getLabel(item)
                  return currentValue
                    .toLocaleLowerCase()
                    ?.includes(search.toLocaleLowerCase())
                })
                console.log('Listered Filter: ', filteredList)
                setListItems(filteredList)
              }}
              placeholder={selecTitle}
              className="h-9"
            />
            <CommandGroup className="text-gray-950">
              <CommandList className="max-h-72 w-full overflow-y-auto text-gray-950 dark:text-gray-50">
                {listItems.map((item) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={getValue(item)}
                    value={getValue(item)}
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
      )}
    </Popover>
  )
}
