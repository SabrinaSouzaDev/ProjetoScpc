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
  handleClick: (value: string) => void
  options?: ListOptions[]
  value?: string
  className?: string
  children?: React.ReactNode
}

export function Select({
  title,
  subtitle,
  options,
  handleClick,
  value,
  className,
  children,
}: SelectProps) {
  return (
    <ChadcnSelect value={value || ''} onValueChange={(e) => handleClick(e)}>
      <SelectTrigger
        className={
          className || 'max-h-9 sm:w-full md:w-48 lg:w-56 xl:w-[16.5rem]'
        }
      >
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className={options ? '' : 'flex flex-col gap-2 p-1'}>
          <SelectLabel className={options ? '' : 'p-1'}>{subtitle}</SelectLabel>
          {options
            ? options.map((item, index) => {
                return (
                  <SelectItem
                    key={index}
                    value={item.value}
                    className="w-full cursor-pointer"
                  >
                    {item.title}
                  </SelectItem>
                )
              })
            : children}
        </SelectGroup>
      </SelectContent>
    </ChadcnSelect>
  )
}
