import * as React from 'react'

import {
  Select as ChadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type ListOptions = {
  title: string
  value: string
}

type SelectProps = {
  title: string
  subtitle: string
  handleClick: (value: ListOptions) => void // Aceita um objeto ListOptions
  options?: ListOptions[]
  value?: string
  className?: string
  children?: React.ReactNode
}

export function SelectForm({
  title,
  subtitle,
  options,
  handleClick,
  value,
  className,
  children,
}: SelectProps) {
  return (
    <div className={className}>
      <ChadcnSelect
        value={value || ''} // Se não houver valor, será uma string vazia
        onValueChange={(selectedValue) => {
          const selectedOption = options?.find(
            (option) => option.value === selectedValue,
          )
          if (selectedOption) {
            handleClick(selectedOption) // Passa o objeto selecionado
          } else {
            handleClick({ title: '', value: '' }) // Reseta para um valor vazio se nada for selecionado
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{subtitle}</SelectLabel>
            {options?.map((item) => (
              <SelectItem
                key={item.value} // Utilize o value como chave
                value={item.value}
                className="cursor-pointer"
              >
                {item.title}
              </SelectItem>
            ))}
            {children} {/* Renderizando children aqui, se houver */}
          </SelectGroup>
        </SelectContent>
      </ChadcnSelect>
    </div>
  )
}
