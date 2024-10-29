import { ReactNode } from 'react'

interface AlignDivProps {
  children: ReactNode
}

export function AlignDiv({ children }: AlignDivProps) {
  return <div className="flex items-center justify-start">{children}</div>
}
