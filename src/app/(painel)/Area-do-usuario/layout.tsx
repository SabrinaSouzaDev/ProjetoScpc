import { PageTitle } from '@/components/Shared/PageTitle'

import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    template: 'SCPC - %s',
    default: 'SCPC',
  },
}

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <>
      <PageTitle />
      <div>{children}</div>
    </>
  )
}
