'use client'

import { ScrollArea } from '@/components/ui/scroll-area'

import { AccordionMenuSideBar } from './AccordionMenuSideBar'

import { useState } from 'react'
import Link from 'next/link'

export function DesktopSideBar() {
  const setSheetOpen = useState(false)[1]
  return (
    <aside className="hidden w-[270px] shrink-0 border-r-2 border-neutral-600 bg-neutral-900 pb-5 shadow-md  dark:border-slate-800 dark:bg-background md:block">
      <ScrollArea className="mb-auto h-full flex-col justify-center overflow-y-auto pt-2">
        <Link href={'/'} target="_self">
          <h3 className="mb-4 text-center text-slate-50">SCPC</h3>
        </Link>
        <div className="flex h-52">
          <AccordionMenuSideBar setIsOpen={setSheetOpen} />
        </div>
      </ScrollArea>
    </aside>
  )
}
