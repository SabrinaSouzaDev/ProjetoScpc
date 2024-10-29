import { DesktopSideBar } from '@/components/Layout/DesktopSideBar'
import { Footer } from '@/components/Layout/Footer'
import { Header } from '@/components/Layout/Header'

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

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-background">
        <DesktopSideBar />
        <main className="flex-1 overflow-y-auto p-4">
          <div>{children}</div>
        </main>
      </div>
      <Footer />
    </>
  )
}
