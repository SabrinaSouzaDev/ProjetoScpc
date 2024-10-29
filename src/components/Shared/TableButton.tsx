import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

type TableButtonTypes = {
  id: number
  link?: string
  color?: string
  icon?: JSX.Element
}

type TableButtonProps = { tipos: TableButtonTypes[] }

export default function TableButton({ tipos }: TableButtonProps) {
  return (
    <div className="flex ">
      {tipos.map((tipos) => (
        <Link key={tipos.id} href={tipos.link || '/'}>
          <Button className={`mr-2 p-3  hover:bg-black  ${tipos.color}`}>
            <span>{tipos.icon}</span>
          </Button>
        </Link>
      ))}
    </div>
  )
}
