import { ThemeToggle } from './ThemeToggle'
// import { BellSimple } from '@phosphor-icons/react/dist/ssr'
import { MobileSideBar } from './MobileSideBar'
import { DropdownMenuComponent } from './DropdownMenuComponent'
import { Logo } from '../Shared/Logo'

export function Header() {
  return (
    <header className=" flex h-16 items-center bg-primary p-2 dark:bg-primary/35">
      <MobileSideBar />
      <div className="grow items-start">
        <Logo />
      </div>
      <div className="flex shrink items-center space-x-6 justify-self-end hover:inline-flex">
        <div className="flex space-x-4">
          {/* <BellSimple className="cursor-pointer text-white" size={25} /> */}
        </div>
        <DropdownMenuComponent />
        <ThemeToggle />
      </div>
    </header>
  )
}
