'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Signin() {
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl')

  const urlCallBack =
    process.env.NEXT_PUBLIC_BASE_PATH !== undefined
      ? process.env.NEXT_PUBLIC_BASE_PATH + '/'
      : '/'

  useEffect(() => {
    signIn('keycloak', { callbackUrl: callbackUrl ?? urlCallBack })
  })
  return <div>Redirecionando login no keycloak...</div>
}
