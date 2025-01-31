import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'
import { SidebarData } from '../../constants/links'

type NavBarProps = {
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}

export function AccordionMenuSideBar({ setIsOpen }: NavBarProps) {
  const [selectedItem, setSelectedItem] = useState(0)
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  )
  const session = useSession()
  const hasPermission = (permissoes: string[]) => {
    const userRoles = session?.data?.user?.resourceAccess?.scpc?.roles || []
    return (
      permissoes.some((permissao) => userRoles.includes(permissao)) ||
      permissoes.length === 0
    )
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
        {SidebarData.map((item, index) => {
          // Exibir o primeiro item sempre ou checar as permissões para os outros
          const shouldDisplayItem =
            index === 0 || hasPermission(item.permissoes || [])

          return shouldDisplayItem ? (
            <div key={item.id}>
              {item.subItems ? (
                <AccordionItem value={item.id.toString()} className="px-3">
                  <AccordionTrigger
                    onClick={() => {
                      handleClick(item.id)
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
                    <div className="max-h-[25rem] flex-col space-y-2 overflow-auto rounded bg-neutral-800 align-baseline text-slate-50 dark:bg-neutral-900 dark:text-slate-200">
                      {item.subItems.map((subItem) =>
                        hasPermission(subItem.permissoes || []) ? (
                          <Link
                            key={subItem.id}
                            target="_self"
                            className={`${selectedItem === subItem.id
                              ? 'bg-primary dark:bg-primary/35'
                              : ''
                              } flex justify-between rounded p-[8px] text-[15px] leading-[25px] text-slate-50 hover:bg-primary dark:hover:bg-primary/35`}
                            href={subItem.suburl}
                            onClick={() => {
                              handleClick(subItem.id)
                              if (setIsOpen) {
                                setIsOpen(false)
                              }
                            }}
                          >
                            <span className="flex items-center justify-center gap-4">
                              <h6 className='text-[0.2rem] size-5'>
                                {subItem.icon}
                              </h6>
                              <h4 className='text-slate-50 text-[0.8rem] font-bold'>
                                {subItem.subtitle}
                              </h4>
                            </span>
                          </Link>
                        ) : null,
                      )}
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
                  <span className="flex items-center justify-center gap-4">
                    <h6 className='text-[0.2rem] size-5'>
                      {item.icon}
                    </h6>
                    <h4 className='text-slate-50 text-[0.8rem] font-bold'>
                      {item.title}
                    </h4>
                  </span>
                </Link>
              )}
            </div>
          ) : null
        })}
      </Accordion>
    </div>
  )
}
