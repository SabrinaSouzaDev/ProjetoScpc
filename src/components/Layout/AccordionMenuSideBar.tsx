import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'
import { SidebarData } from '../../constants/links'
import { useSession } from 'next-auth/react'

type NavBarProps = {
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}

export function AccordionMenuSideBar({ setIsOpen }: NavBarProps) {
  const [selectedItem, setSelectedItem] = useState(0)
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  )
  const session = useSession()
  function toggleItem(id: number) {
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  function handleClick(id: number) {
    setSelectedItem(id)
  }

  return (
    <div className="w-[270px] space-y-1 px-1">
      <Accordion
        type="multiple"
        defaultValue={Object.keys(expandedItems)}
        className="w-full border-none text-destructive-foreground outline-none"
      >
        {SidebarData.map((item) => (
          <div key={item.id}>
            {item.subItems.length &&
            // // TODO KEYCLOAK
            item.permissoes &&
            (!!session?.data?.user?.resourceAccess?.scpc.roles?.filter((role) =>
              item.permissoes?.includes(role),
            ).length ||
              item.permissoes.length === 0) &&
            item.subItems ? (
              <AccordionItem value={item.id.toString()} className="px-3">
                <AccordionTrigger
                  onClick={() => {
                    toggleItem(item.id)
                  }}
                >
                  <div className="shadow-black4 flex justify-between align-middle text-[15px] leading-[25px] text-slate-50 outline-none">
                    <span className="ml-auto flex decoration-transparent">
                      {item.icon}
                      {item.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex-col space-y-2 rounded bg-neutral-800 align-baseline text-slate-50 dark:bg-neutral-900 dark:text-slate-200">
                    {item.subItems.map((subItem) => (
                      <div key={subItem.id}>
                        {item.subItems?.length &&
                        subItem.permissoes &&
                        (!!session?.data?.user?.resourceAccess?.scpc.roles?.filter(
                          (role) => subItem.permissoes?.includes(role),
                        ).length ||
                          subItem.permissoes.length === 0) &&
                        subItem.permissoes ? (
                          <Link
                            target="_self"
                            className={`${selectedItem === subItem.id ? 'bg-primary dark:bg-primary/35' : ''} flex justify-between rounded p-[8px] text-[15px] leading-[25px] text-slate-50 hover:bg-primary dark:hover:bg-primary/35`}
                            href={subItem.suburl}
                            onClick={() => {
                              handleClick(subItem.id)
                              if (setIsOpen) {
                                setIsOpen(false)
                              }
                            }}
                          >
                            <span className="flex">
                              {subItem.icon}
                              {subItem.subtitle}
                            </span>
                          </Link>
                        ) : (
                          ''
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <Link
                onClick={() => {
                  if (setIsOpen) {
                    setIsOpen(false)
                  }
                }}
                href={item.url}
                className="text-black11 shadow-black4 my-[10px] flex w-full items-center justify-between rounded bg-neutral-900 p-[8px] text-[15px] leading-[25px] text-slate-50 shadow-[0_0px_2px] dark:bg-neutral-900"
              >
                <span className="flex">
                  {item.icon}
                  {item.title}
                </span>
              </Link>
            )}
          </div>
        ))}
      </Accordion>
    </div>
  )
}
