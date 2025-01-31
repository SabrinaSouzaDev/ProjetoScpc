import React, { ReactNode } from 'react'
import { SessionProvider } from './context/SessionProvidder'

type Props = {
  readonly children: ReactNode
}

export default function TemplateRoot({ children }: Props) {
  return (
    <SessionProvider basePath={process.env.NEXT_PUBLIC_BASE_NEXT_AUTH}>
      <React.StrictMode>{children}</React.StrictMode>
    </SessionProvider>
  )
}
