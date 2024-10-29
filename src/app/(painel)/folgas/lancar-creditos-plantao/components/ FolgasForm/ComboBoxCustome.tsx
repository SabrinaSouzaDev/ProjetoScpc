import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { CommandList } from 'cmdk'
import { ChevronsUpDown } from 'lucide-react'

interface ListItem {
  id: number
  nome: string
}

type ComboboxProps<T extends ListItem> = {
  selecTitle: string
  list: T[]
  handleClick: (item: T) => void
  getValue: (item: T) => string
  getLabel: (item: T) => string
}

export function ComboboxCustome<T extends ListItem>({
  selecTitle,
  list,
  handleClick,
  getValue,
  getLabel,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string>('')

  const selectedItem = value
    ? list.find((listData) => getValue(listData) === value)
    : undefined

  const displayName = selectedItem ? getLabel(selectedItem) : selecTitle

  function handleChangeSelectValue(newValue: string) {
    setOpen(false)
    setValue(newValue)
    const selectedItem = list.find((item) => getValue(item) === newValue)
    if (selectedItem) handleClick(selectedItem)
  }

  return (
    <div>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="w-full justify-between"
      >
        {value ? displayName : selecTitle}
        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
      {open && (
        <div className="w-full p-0">
          <Command onClick={(e) => e.preventDefault()}>
            <CommandInput placeholder={selecTitle} className="h-9" />
            <CommandGroup>
              <CommandList>
                <CommandItem
                  key="none"
                  value="none"
                  onSelect={() => handleChangeSelectValue('none')}
                >
                  Sem Coordenadoria
                </CommandItem>
                {list.map((item) => (
                  <CommandItem
                    key={getValue(item)}
                    value={getValue(item)}
                    onSelect={() => handleChangeSelectValue(getValue(item))}
                  >
                    {getLabel(item)}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </div>
      )}
    </div>
  )
}
