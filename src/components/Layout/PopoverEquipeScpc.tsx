'use client'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import avatar from '../../../public/static/images/avatar.png'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Employee {
  src: string | StaticImageData
  alt: string
  name: string
  position: string
  linkUrl?: string
}
interface CustomPopoverProps {
  triggerText: string
  contentText: string
  employees: Employee[]
}

export function PopoverDemo({
  triggerText,
  contentText,
  employees,
}: CustomPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="text-white">
          {triggerText}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="max-h-screen w-full max-w-screen-lg overflow-y-auto p-4"
        align="center"
        side="bottom"
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{triggerText}</h4>
            <p className="text-sm text-muted-foreground">{contentText}</p>
          </div>
          <ScrollArea className="size-full">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {employees.map((employee, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-start"
                >
                  <Link
                    href={employee.linkUrl || ''}
                    target="_blank"
                    className="relative flex size-full flex-row items-center justify-center lg:items-start"
                  >
                    <Image
                      height={110}
                      width={110}
                      src={employee.src}
                      alt={employee.alt}
                      placeholder="blur"
                      blurDataURL={`${avatar}`}
                      className="h-36 rounded-lg object-cover"
                    />
                  </Link>
                  <div className="flex flex-col items-center justify-start p-2 text-center align-middle">
                    <h4 className="font-bold">{employee.name}</h4>
                    <p className="text-sm">{employee.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
