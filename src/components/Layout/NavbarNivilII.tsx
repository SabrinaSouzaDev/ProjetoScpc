/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import { Dispatch, RefObject, SetStateAction, useState } from 'react'
import { NavbarItem } from './NavbarItem'
import { Session } from 'next-auth'
import { verificaPermissaoSideBar } from '@/utils/util'

type NavBarProps = {
  setIsOpen?: Dispatch<SetStateAction<boolean>>
  subItem: NavbarItem
  session: Session | null
  closeSidebar?: () => void
  handleMouseEntersub?: (id: number) => void
  subitemRef?: RefObject<HTMLDivElement>
}

export function NavbarNivilII({ setIsOpen, session, subItem }: NavBarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  )
  function toggleItem(id: number) {
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  return (
    <div className="w-[270px] space-y-1 px-1" key={subItem.id}>
      {subItem?.subItems?.length !== undefined &&
      subItem?.subItems?.length >= 1 ? (
        <Accordion
          type="multiple"
          defaultValue={Object.keys(expandedItems)}
          className="w-full border-none text-destructive-foreground outline-none"
        >
          <AccordionItem value={subItem.id.toString()} className="px-3">
            <AccordionTrigger
              onClick={() => {
                toggleItem(subItem.id)
              }}
            >
              <div className="shadow-black4 flex justify-between align-middle text-[15px] leading-[25px] text-slate-50 outline-none">
                <span className="ml-auto flex decoration-transparent">
                  {/* {subItem.icon} */}
                  {subItem.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex-col space-y-2 rounded bg-neutral-800 align-baseline text-slate-50 dark:bg-neutral-900 dark:text-slate-200">
                {subItem.subItems?.map((subItem) => {
                  if (
                    verificaPermissaoSideBar(
                      session?.user?.resourceAccess?.scpc.roles,
                      subItem.permissoes,
                    )
                  ) {
                    return (
                      <NavbarNivilII
                        session={session}
                        subItem={subItem}
                        key={subItem.id}
                      />
                    )
                  } else {
                    return <></>
                  }
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Link
          onClick={() => {
            if (setIsOpen) {
              setIsOpen(false)
            }
          }}
          href={subItem.url}
          className="text-black11 shadow-black4 my-[10px] flex w-full items-center justify-between rounded bg-neutral-900 p-[8px] text-[15px] leading-[25px] text-slate-50 shadow-[0_0px_2px] dark:bg-neutral-900"
        >
          <span className="flex">
            {/* {subItem.icon} */}
            {subItem.title}
          </span>
        </Link>
      )}
    </div>
  )
}
