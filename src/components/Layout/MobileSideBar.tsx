'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { List } from '@phosphor-icons/react/dist/ssr'
import { AccordionMenuSideBar } from './AccordionMenuSideBar'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LogoBrancSvg from '../../../public/static/icon/dpe-branca.svg'

export function MobileSideBar() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="block md:hidden">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger className="m-1" asChild>
          <List size={36} />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="neutral-900 border-r-1 flex w-[290px] overflow-y-auto border-gray-900 bg-neutral-900 text-white shadow-md dark:bg-card"
        >
          <SheetHeader>
            <Link href={'/'} target="_self">
              <div className="flex items-center">
                <Image
                  className="mx-auto"
                  src={LogoBrancSvg}
                  alt="Logo Defensoria"
                  height={90}
                  width={90}
                />
              </div>
            </Link>
            <SheetDescription>
              <div className="flex size-full overflow-y-auto py-2">
                <AccordionMenuSideBar setIsOpen={setSheetOpen} />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
