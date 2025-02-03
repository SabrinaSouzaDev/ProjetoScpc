import { Button } from '@/components/ui/button'
import {
  Dialog as ChadcnDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode } from 'react'

type DialogProps = {
  className?: string
  dialogClassName?: string
  buttonTitle: ReactNode
  title: string
  description: string
  buttonActionTitle?: string
  children: ReactNode
  disabled?: boolean
  onClose?: () => void // Adiciona uma função callback para fechamento
}

export function Dialog({
  className,
  dialogClassName,
  buttonTitle,
  title,
  description,
  buttonActionTitle,
  children,
  disabled,
  onClose, // Recebe a função callback para fechamento
}: DialogProps) {
  return (
    <ChadcnDialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled || false}
          className={
            className ||
            'dark: mb-4 max-w-[15.2rem] text-[0.8rem] text-white dark:bg-primary/35 dark:hover:bg-primary/50 md:text-[1rem]'
          }
        >
          {buttonTitle}
        </Button>
      </DialogTrigger>

      <DialogContent className={dialogClassName || 'sm:max-w-[425px]'}>
        <DialogHeader>
          <DialogTitle className="sm:[0.8rem] text-[1rem] md:text-[1.1rem] lg:text-[1.3rem]">
            {title}
          </DialogTitle>
          <DialogDescription className="sm:[0.6rem] text-[0.8rem]  md:text-[1rem]">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        {buttonActionTitle ? (
          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-600 text-white"
              onClick={() => onClose && onClose()}
            >
              {buttonActionTitle}
            </Button>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </ChadcnDialog>
  )
}
