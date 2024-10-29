'use client'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { WarningOctagon } from '@phosphor-icons/react'

interface ErrorMessageProps {
  message: string
  title?: string
}

export const ErrorMessage = ({
  message,
  title = 'Erro',
}: ErrorMessageProps) => {
  return (
    <Alert
      variant="destructive"
      className="flex items-center justify-start border-2 border-red-500 p-4 dark:border-red-400"
    >
      <div className="flex-row">
        <WarningOctagon
          size={55}
          className="dark:border-400 text-red-500 dark:border-red-400"
        />
      </div>
      <div className="ml-3">
        <AlertTitle className="font-bold text-red-500 dark:text-red-400">
          {title}
        </AlertTitle>
        <AlertDescription className="text-[0.8rem] text-red-600  dark:text-red-400 sm:text-[1rem]">
          {message}
        </AlertDescription>
      </div>
    </Alert>
  )
}
